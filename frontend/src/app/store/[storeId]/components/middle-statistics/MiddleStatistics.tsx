import { SKELETON_COUNT_MIDDLE_STATISTICS } from '@/constants/skeleton.constants'

import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import { Skeleton } from '@/shared/ui/Skeleton'

import LastUsers from './LastUsers'
import Overview from './Overview'

const MiddleStatistics = () => {
  const { middle, isMiddleStatisticsLoading } = useGetStatistics()

  if (isMiddleStatisticsLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: SKELETON_COUNT_MIDDLE_STATISTICS }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    )
  }
  // если у нас есть длина в объекте двух массивов
  return (
    <div className="middle grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-10">
      {middle?.monthlySales.length || middle?.lastUsers.length ? (
        <>
          <div className="header flex flex-col items-stretch space-y-0 border-b p-4">
            <h3 className="title text-xl font-medium tracking-[0.1px] line-clamp-1"></h3>
          </div>
          <div className="overview col-span-1 lg:col-span-3 xl:col-span-4">
            {/* тут будет выводиться график */}
            <Overview data={middle.monthlySales} />
          </div>
          <div className="last-users col-span-1 lg:col-span-3">
            <LastUsers data={middle.lastUsers} />
          </div>
        </>
      ) : (
        <p className="text-2xl text-red-500">Нет данных для статистики</p>
      )}
    </div>
  )
}

export default MiddleStatistics
