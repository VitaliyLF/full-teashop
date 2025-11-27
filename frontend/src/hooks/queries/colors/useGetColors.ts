import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { colorService } from '@/services/color.services'

export const useGetColors = () => {
  const { storeId } = useParams<{ storeId: string }>()

  // используем useQuery для get запросов get запросы считают безопастными и не меняют состояние на сервре
  // useQuery — для чтения данных, то есть для GET-запросов.
  const { data: colors, isLoading } = useQuery({
    // делаем один ключ для инвалидации
    queryKey: ['get colors for store dashboard'],
    queryFn: () => colorService.getByStoreId(storeId),
  })

  return useMemo(() => ({ colors, isLoading }), [colors, isLoading])
}
