import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { productService } from '@/services/product.services'

export const useGetProducts = () => {
  const { storeId } = useParams<{ storeId: string }>()

  // используем useQuery для get запросов get запросы считают безопастными и не меняют состояние на сервре
  // useQuery — для чтения данных, то есть для GET-запросов.
  const { data: products, isLoading } = useQuery({
    // делаем один ключ для инвалидации
    queryKey: ['get products for store dashboard', storeId],
    queryFn: () => productService.getByStoreId(storeId),
  })

  return useMemo(() => ({ products, isLoading }), [products, isLoading])
}
