import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { categoryService } from '@/services/category.services'

export const useGetCategories = () => {
  const { storeId } = useParams<{ storeId: string }>()

  // используем useQuery для get запросов get запросы считают безопастными и не меняют состояние на сервре
  // useQuery — для чтения данных, то есть для GET-запросов.
  const { data: categories, isLoading } = useQuery({
    // делаем один ключ для инвалидации
    queryKey: ['get categories for store dashboard'],
    // store/:storeId/categories/by-storeId/:id
    queryFn: () => categoryService.getByStoreId(storeId),
  })

  return useMemo(() => ({ categories, isLoading }), [categories, isLoading])
}
