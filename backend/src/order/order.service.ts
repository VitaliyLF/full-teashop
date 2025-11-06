import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
// имортируем юкасса
import { ICapturePayment, YooCheckout } from '@a2seven/yoo-checkout'
import { OrderDto } from './dto/order.dto'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { EnumOrderStatus } from '@prisma/client'

// делаем проверку что у нас есть такие переменные
if (!process.env.YOOKASSA_SHOP_ID || !process.env.YOOKASSA_SECRET_KEY) {
  throw new Error('Missing YOOKASSA env variables')
}

// конфиг для юкассы
const checkout = new YooCheckout({
  shopId: process.env['YOOKASSA_SHOP_ID'],
  secretKey: process.env['YOOKASSA_SECRET_KEY']
})

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Метод для создания платежа
  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(item => ({
      quantity: item.quantity,
      price: item.price,
      // это чтобы привязывать конкретный продукт к продукту из dto
      product: {
        connect: {
          id: item.productId
        }
      },
      // это чтобы привязывать конкретный orderItem к конкретному магазину
      // это весь коннект нужен чтобы мы потом могли выводить статистику
      store: {
        connect: {
          id: item.storeId
        }
      }
    }))

    // Допустим пользователь положил 2 товара от 1 магазина
    // Допустим пользователь положил 4 товара от 2 магазина
    // И он это все оплатил в одном платеже
    // теперь нужно цену за 2 товара начислить первому магазину
    // и нужно цену за 4 товара начислить второму магазину
    // поэтому мы и делаем connect чтобы это обрабатывать

    // получаем общую цену
    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    // Создаем заказ в бд
    const order = await this.prisma.order.create({
      // при создании всегда есть data
      data: {
        // прокидываем статус из dto
        status: dto.status,
        // прокидываем в items ранее созданные наши orderItems
        items: {
          create: orderItems
        },
        // общая сумма заказов
        total,
        // и подключаем юзера
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    // Создаем сам платеж в юкассе
    // createPayment метод из юкассы
    const payment = await checkout.createPayment({
      // Сумма оплаты
      amount: {
        // прокидываем нашу общую сумму и делаем toFixed чтобы было 240.00 пример
        value: total.toFixed(2),
        // Валюта
        currency: 'RUB'
      },
      // метод оплаты банковская карта, там их много по типу альфабанка и тд
      payment_method_data: {
        type: 'bank_card'
      },
      // подтверждение будет выступать в качестве другой странице
      confirmation: {
        type: 'redirect',
        // куда будет переадресовывать пользователя после успешной оплаты
        // указываем наш клиент и страничку спасибо
        return_url: `${process.env.CLIENT_URL}/thanks`
      },
      // Описание платежа
      description: `Оплата заказа в магазине TeaShop. ID платежа: #${order.id}`
    })

    return payment
  }

  // Метод на обновление статуса заказа, для этого нужен ngrok
  async updateStatus(dto: PaymentStatusDto) {
    // делаем проверку на статус, если payment.waiting_for_capture т.е ожидает подверждения
    // все эти ивенты можно посмотреть в юкассе в админке
    if (dto.event === 'payment.waiting_for_capture') {
      // типизируем из библиотеки юкассы
      const capturePayment: ICapturePayment = {
        // общая сумма - amount
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency
        }
      }

      // вызываем метод из конфига юкассы и принимает в себя id платежа и оплату с суммой и валютой
      return checkout.capturePayment(dto.object.id, capturePayment)
    }

    // если оплата успешно прошла
    if (dto.event === 'payment.succeeded') {
      // получаем id Заказа
      // через split мы режим строчку на под массив строчек
      // получается примерно так ["Оплата заказа в магазине TeaShop. ID платежа: ", "15"]
      // где потом получаем 1 элемент из этого массива т.е наше число и записываем его в orderId
      const orderId = dto.object.description.split('#')[1]

      // дальше делаем обновление в бд статуса
      await this.prisma.order.update({
        // ищем по обрезанному ранее id заказа
        where: {
          id: orderId
        },
        // и в качесве статуста указываем через Enum PAYED т.е оплачен
        data: {
          status: EnumOrderStatus.PAYED
        }
      })

      // обязательно возвращаем true
      return true
    }

    // обязательно возвращаем true
    return true
  }
}
