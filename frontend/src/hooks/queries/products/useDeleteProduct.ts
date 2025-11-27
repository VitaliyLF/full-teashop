import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { productService } from '@/services/product.services'

export const useDeleteProduct = () => {
  const { storeId, productId } = useParams<{ storeId: string; productId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { mutate: deleteProduct, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete product'],
    // серверный роутинг для продукта store/:storeId/products/:productId
    mutationFn: () => productService.deleteProduct(productId),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get products for store dashboard'],
      })
      toast.success('Товар удален')
      push(STORE_URL.products(storeId))
    },
    onError() {
      toast.error('Ошибка при удалении продукта')
    },
  })

  return useMemo(() => ({ deleteProduct, isLoadingDelete }), [deleteProduct, isLoadingDelete])
}
