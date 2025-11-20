import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { statisticsService } from '@/services/statistics.services'

export const useGetStatistics = () => {
  const params = useParams<{ storeId: string }>()

  // получаем данные по /main/${storeId}
  const { data: main, isLoading: isMainStatisticsLoading } = useQuery({
    queryKey: ['get main statistics'],
    queryFn: () => statisticsService.getMain(params.storeId),
  })

  // получаем данные по /middle/${storeId}
  const { data: middle, isLoading: isMiddleStatisticsLoading } = useQuery({
    queryKey: ['get middle statistics'],
    queryFn: () => statisticsService.getMiddle(params.storeId),
  })

  // почему тут записываются сначала () скобки а потом {}
  // Круглые скобки говорят JavaScript:
  // Это не блок кода, а объект. Верни его.

  // В стрелочной функции фигурные скобки — это тело функции, а не объект.
  // если мы запишем как { main, middle } JavaScript думает, что ты написал тело функции без return.
  return useMemo(
    () => ({ main, isMainStatisticsLoading, middle, isMiddleStatisticsLoading }),
    [main, isMainStatisticsLoading, middle, isMiddleStatisticsLoading],
  )
}
