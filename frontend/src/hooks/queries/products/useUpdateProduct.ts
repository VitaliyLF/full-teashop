import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.services'

import { IProductInput } from '@/shared/types/product.interface'

export const useUpdateProduct = () => {
  const { productId, storeId } = useParams<{ productId: string; storeId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE
  const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update product', productId],
    mutationFn: (data: IProductInput) => productService.update(productId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get products for store dashboard'],
      })
      toast.success('Товар обновлен')
      // нужно ли роутить после обновления товара на магазин с товарами хз
      push(STORE_URL.products(storeId))
    },
    onError() {
      toast.error('Ошибка при обновлении товара')
    },
  })

  return useMemo(() => ({ updateProduct, isLoadingUpdate }), [updateProduct, isLoadingUpdate])
}
