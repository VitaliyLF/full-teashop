import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { productService } from '@/services/product.services'

import { IProductInput } from '@/shared/types/product.interface'

export const useUpdateProduct = () => {
  const { storeId } = useParams<{ storeId: string }>()

  const queryClient = useQueryClient()

  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE
  const { mutate: updateProduct, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update product', storeId],
    mutationFn: (data: IProductInput) => productService.update(storeId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get products for store dashboard'],
      })
      toast.success('Товар обновлен')
    },
    onError() {
      toast.error('Ошибка при обновлении товара')
    },
  })

  return useMemo(() => ({ updateProduct, isLoadingUpdate }), [updateProduct, isLoadingUpdate])
}
