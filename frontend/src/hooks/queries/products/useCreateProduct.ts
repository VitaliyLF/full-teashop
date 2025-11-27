import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.services'

import { IProductInput } from '@/shared/types/product.interface'

export const useCreateProduct = () => {
  const { storeId } = useParams<{ storeId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  // используем useMutation только с Идемпотентные запросами
  // POST
  // PUT
  // DELETE
  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE.
  const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create product', storeId],
    mutationFn: (data: IProductInput) => productService.create(storeId, data),
    onSuccess() {
      // после успеха мы обновляет products
      // invalidateQueries чтобы делать инвалидацию - Перезапрос данных вручную с сервера
      // делаем один ключ для инвалидации
      queryClient.invalidateQueries({
        queryKey: ['get products for store dashboard'],
      })
      toast.success('Товар создан')
      // после успешного создания продукта редеректить на /store/:storeId/products
      push(STORE_URL.products(storeId))
    },
    onError() {
      toast.error('Ошибка при создании продукта')
    },
  })

  return useMemo(() => ({ createProduct, isLoadingCreate }), [createProduct, isLoadingCreate])
}
