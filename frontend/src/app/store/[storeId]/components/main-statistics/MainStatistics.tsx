import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import MainStatisticsItem from './MainStatisticsItem'

const MainStatistics = () => {
  const { main } = useGetStatistics()

  return (
    <div className="main mt-8 grid grid-cols-1 gap-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      {main?.length ? (
        main.map((item) => <MainStatisticsItem key={item.id} item={item} />)
      ) : (
        <p className="text-2xl text-red-500">Нет данных для статистики</p>
      )}
    </div>
  )
}

export default MainStatistics
