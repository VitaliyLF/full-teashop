import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { EnumOrderStatus, IPaymentResponse } from '@/shared/types/order.interface'

type TypeData = {
  // status: EnumOrderStatus
  items: {
    quantity: number
    price: number
    productId: string
    storeId: string
  }[]
}

// метод на создание заказа
const place = async (data: TypeData) => {
  return await axiosWithAuth<IPaymentResponse>({
    // серверный роутинг для заказа /orders/place
    url: API_URL.orders('/place'),
    method: 'POST',
    data,
  })
}

export const orderService = {
  place,
}
