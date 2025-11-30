'use client'

import Heading from '@/components/ui/Heading'

import MainStatistics from './components/main-statistics/MainStatistics'
import MiddleStatistics from './components/middle-statistics/MiddleStatistics'

const Store = () => {
  return (
    <div className="wrapper p-6">
      <Heading title="Статистика" />
      <MainStatistics />
      <MiddleStatistics />
    </div>
  )
}

export default Store
