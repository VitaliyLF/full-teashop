// Все это приходит в response
// class Логика + экземпляры остаётся в JS, если же мы обычно описываем через interface / type то весь ts привращаеться в js а если через class То нет

// Сумма оплаты
class AmountPayment {
  value: string
  // валюта
  currency: string
}

class ObjectPayment {
  id: string
  status: string
  amount: AmountPayment
  payment_method: {
    type: string
    id: string
    saved: boolean
    title: string
    card: object
  }
  created_at: string
  // дата истечения заказа
  expires_at: string
  description: string
}

// Статус оплаты
export class PaymentStatusDto {
  event:
    | 'payment.succeeded'
    | 'payment.waiting_for_capture'
    | 'payment.canceled'
    | 'refund.succeeded'
  type: string
  object: ObjectPayment
}
