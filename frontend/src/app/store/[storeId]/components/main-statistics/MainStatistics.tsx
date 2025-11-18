import { useGetStatistics } from '@/hooks/queries/statistics/useGetStatistics'

import MainStatisticsItem from './MainStatisticsItem'

const MainStatistics = () => {
  const { main } = useGetStatistics()

  return (
    <div className="main">
      {main?.length ? (
        main.map((item) => <MainStatisticsItem key={item.id} item={item} />)
      ) : (
        <div className="">Нет данных для статистики</div>
      )}
    </div>
  )
}

export default MainStatistics
