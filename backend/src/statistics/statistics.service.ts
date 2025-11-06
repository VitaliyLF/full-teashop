import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { PrismaService } from 'src/prisma.service'

// локализируем на русский язык
dayjs.locale('ru')

const mountNames = [
  'янв',
  'фев',
  'мар',
  'апр',
  'мая',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек'
]

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  // Метод для получения главной статистики в админ панели
  // просто общий метод где происходит вычисление всего и мы это все приводим в удобный формат массива
  async getMainStatistics(storeId: string) {
    // выручка
    const totalRevenue = await this.calculateTotalRevenue(storeId)
    // Количество продуктов
    const productsCount = await this.countProducts(storeId)
    // Категории продуктов
    const categoriesCount = await this.countCategories(storeId)
    const averageRating = await this.calculateAverageRating(storeId)

    // дальше возвращаем все в таком формате
    return [
      { id: 1, name: 'Выручка', value: totalRevenue },
      { id: 2, name: 'Товары', value: productsCount },
      { id: 3, name: 'Категории', value: categoriesCount },
      { id: 4, name: 'Средний рейтинг', value: averageRating || 0 }
    ]
  }

  // Метод для получения продаж у последних 5 юзеров за 30 дней
  async getMiddleStatistics(storeId: string) {
    // получаем продажи за последние 30 дней
    const monthlySales = await this.calculateMonthlySales(storeId)
    // Последние 5 пользователей которые совершили заказ в нашем магазине
    const lastUsers = await this.getLastUsers(storeId)

    return { monthlySales, lastUsers }
  }

  // Функция которая высчитывает выручку
  private async calculateTotalRevenue(storeId: string) {
    // получаем заказы
    const orders = await this.prisma.order.findMany({
      where: {
        items: {
          // оператор some используется при работе с реляционными связями один-ко-многим (или многие-ко-многим) для фильтрации данных по связанным записям.
          // some означает: найти записи, у которых есть хотя бы один связанный элемент, удовлетворяющий условиям.
          // "Найди все заказы, в которых есть хотя бы один товар, относящийся к магазину с где в качестве id указывае id магазина котоырй пришел в функцию
          // Когда использовать some ? Когда хочешь отфильтровать родительские записи по наличию связанных.
          // some — это фильтр по связи: условие выполнено, если хотя бы одна дочерняя запись подходит.
          some: {
            store: {
              id: storeId
            }
          }
        }
      },
      // и включить в эти заказы id магазинов
      include: {
        items: {
          where: {
            storeId
          }
        }
      }
    })

    // Высчитываем общую стоимость у всех заказов и товаров у этих заказов
    const totalRevenue = orders.reduce((acc, order) => {
      const total = order.items.reduce((itemAcc, item) => {
        return itemAcc + item.price * item.quantity
      }, 0)

      return acc + total
    }, 0)

    return totalRevenue
  }

  // метод на получения всех продуктов у магазина
  private async countProducts(storeId: string) {
    const productsCount = await this.prisma.product.count({
      where: { storeId }
    })

    return productsCount
  }

  // метод на получения всех категорий у продуктов у магазина
  private async countCategories(storeId: string) {
    const categoriesCount = await this.prisma.category.count({
      where: { storeId }
    })

    return categoriesCount
  }

  // Получение среднего рейтинга товаров для каждого магазина
  private async calculateAverageRating(storeId: string) {
    // aggregate - метод Prisma для выполнения агрегатных функций (среднее, сумма, минимум, максимум, подсчёт и т.д.)
    const averageRating = await this.prisma.review.aggregate({
      // ищем только для конкретного магазина который пришел в функцию
      where: { storeId },
      // Просим Prisma посчитать среднее значение поля rating
      _avg: { rating: true }
    })

    // на выходе получим что то такое
    // {
    //   _avg: {
    //     rating: 4.6 // или null, если отзывов нет
    //   }
    // }

    // и берем число из этого объекта
    return averageRating._avg.rating
  }

  // Метод на получение продажи за последние 30 дней(то есть заказы, содержащие товары этого магазина).
  private async calculateMonthlySales(storeId: string) {
    // здесь дата 30 дней назад, потому что мы за месяц собираем
    const startDate = dayjs().subtract(30, 'days').startOf('day').toDate()
    // это сегоднящний день текущий
    const endDate = dayjs().endOf('day').toDate()

    // делаем запрос в призму
    const salesRaw = await this.prisma.order.findMany({
      where: {
        // от 30 дней назад берем все до текущего дня
        // createdAt: { gte, lte } Ограничиваем поиск по диапазону дат — за последние 30 дней
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        // В заказе должен быть хотя бы один товар этого магазина
        items: {
          some: { storeId }
        }
      },
      // Подгружаем товары внутри заказа полностью
      include: {
        items: true
      }
    })

    // Функция для форматирования даты в таком формате 28 авг
    const formatDate = (date: Date): string => {
      return `${date.getDate()} ${mountNames[date.getMonth()]}`
    }

    // Формирует объект
    // Map позволяет:
    // использовать любой тип данных как ключ (строка, число, объект, массив и т.д.)
    // сохранять порядок вставки элементов
    // быстро искать, добавлять и удалять данные
    const salesByDate = new Map<string, number>()

    // проходимся по все заказам за последние 30 дней
    salesRaw.forEach(order => {
      // New Date  принимает строку с датой создания нашего заказа
      // тут формируем строку с датомй типо 14 фев
      const formattedDate = formatDate(new Date(order.createdAt))

      // высчитываем общую сумму у заказов за последние 30 дней
      const total = order.items.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)

      // если в Map есть строка с датой например 14 фев
      // То в значение закидываем по ключу - сначала строку с этой датой 14 фев, потом высчитывается сумма + общая сумма
      // Допустим, уже обработали один заказ на дату 14 Feb
      // Теперь встречается второй заказ на ту же дату: total = 400
      // "14 Feb": 1400
      if (salesByDate.has(formattedDate)) {
        salesByDate.set(formattedDate, salesByDate.get(formattedDate)! + total)
      } else {
        // иначе мы просто закидываем да строку с датой + общую сумму
        salesByDate.set(formattedDate, total)
      }
    })

    // дальше все это группируем в массив в формате даты и валью
    // Array.from() превращает Map → в обычный массив
    // Array.from(salesByDate) Превращает Map в [[key, value], ...]
    // Деструктурирует пары [key, value] в объект {date: key, value: value}
    // Привратиться в:
    // [
    //   { date: "14 Feb", value: 1400 },
    //   { date: "15 Feb", value: 900 }
    // ]
    const monthlySales = Array.from(salesByDate, ([date, value]) => ({
      date,
      value
    }))

    return monthlySales
  }

  // Метод получение последних 5 пользователей которые совершили заказ в нашем магазине
  private async getLastUsers(storeId: string) {
    const lastUsers = await this.prisma.user.findMany({
      where: {
        // получаем информацию о заказах этих юзеров
        // получаем заказы у которых есть продукты из магазина который пришел
        orders: {
          some: {
            items: { some: { storeId } }
          }
        }
      },
      // делаем сортировку что только 5 последних
      orderBy: { createdAt: 'desc' },
      // берем 5 юзеров
      take: 5,
      // и у этих юзеров включаем поля их заказов
      include: {
        orders: {
          where: {
            items: { some: { storeId } }
          },
          // включая их заказа по магазинам и цене
          include: {
            items: {
              where: { storeId },
              select: { price: true }
            }
          }
        }
      }
    })

    // проходимся по всем этим последним 5 юзерам
    return lastUsers.map(user => {
      // на каждой иттерации получаем последний заказ
      const lastOrder = user.orders[user.orders.length - 1]

      // у этого последнего заказа высчитывает общую сумму продуктов
      const total = lastOrder.items.reduce((total, item) => {
        return total + item.price
      }, 0)

      // и формируем в таком виде данные
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        total
      }
    })
  }
}
