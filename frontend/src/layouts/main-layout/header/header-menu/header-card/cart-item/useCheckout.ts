import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { orderService } from '@/services/order.services'

export const useCheckout = () => {
  // получаем все items корзины
  const { items } = useCart()

  // берем из стора reset Для обновления корзины
  const { reset } = useActions()

  // метод пуш из роутера
  const { push } = useRouter()

  const { mutate: createPayment, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create order and payment'],
    mutationFn: () =>
      // отправляем всю data на сервер где проходимся по items и форматируем под нужный формат
      orderService.place({
        items: items.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
          storeId: item.product.storeId,
        })),
      }),
    // data получаем response от сервера
    onSuccess({ data }) {
      // пушим пользователя на страничу с оплатой
      push(data.confirmation.confirmation_url)
      // Обновляем всю корзину у пользователя после оплаты
      reset()
    },
    onError() {
      toast.error('Ошибка при создании платежа')
    },
  })

  return useMemo(() => ({ createPayment, isLoadingCreate }), [createPayment, isLoadingCreate])
}
