import { Skeleton } from '@/components/ui/Skeleton'

import { SKELETON_COUNT_MAIN_STATISTICS } from '@/constants/skeleton.constants'

import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import MainStatisticsItem from './MainStatisticsItem'

const MainStatistics = () => {
  const { main, isMainStatisticsLoading } = useGetStatistics()

  const skeletonCount = main?.length || SKELETON_COUNT_MAIN_STATISTICS

  if (isMainStatisticsLoading) {
    // Отображаем skeleton для каждой колонки
    return (
      <div className="main mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="main mt-8 grid grid-cols-1 gap-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      {main?.length ? (
        main.map((item) => <MainStatisticsItem key={item.id} {...item} />)
      ) : (
        <p className="text-2xl text-red-500">Нет данных для статистики</p>
      )}
    </div>
  )
}

export default MainStatistics
