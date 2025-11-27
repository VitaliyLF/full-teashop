import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { statisticsService } from '@/services/statistics.services'

export const useGetStatistics = () => {
  const params = useParams<{ storeId: string }>()

  // получаем данные по /main/${storeId}
  const { data: main, isLoading: isMainStatisticsLoading } = useQuery({
    // Включай storeId в queryKey — иначе кэширование react-query может конфликтовать между разными storeId:
    queryKey: ['get main statistics', params.storeId],
    queryFn: () => statisticsService.getMain(params.storeId),
    enabled: !!params.storeId, // чтобы не запускать, пока params.storeId undefined
    // настройка которая определяет, как долго данные считаются свежими после загрузки.
    // Чтобы уменьшить количество запросов и ускорить приложение.

    // Пример
    // Запрос выполнился → данные свежие 60 секунд.
    // Пользователь ушёл со страницы и вернулся через 20 секунд → react-query не делает новый запрос, берёт из кэша.
    // Пользователь вернулся через 2 минуты → данные устарели → react-query автоматически делает refetch.
    staleTime: 1000 * 60, // данные считаются свежими 1 минуту а потом если надо идет рефетч
  })

  // получаем данные по /middle/${storeId}
  const { data: middle, isLoading: isMiddleStatisticsLoading } = useQuery({
    queryKey: ['get middle statistics', params.storeId],
    queryFn: () => statisticsService.getMiddle(params.storeId),
    enabled: !!params.storeId, // чтобы не запускать, пока params.storeId undefined
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
