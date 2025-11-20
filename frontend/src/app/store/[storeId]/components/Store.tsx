'use client'

import Heading from '@/shared/ui/Heading'

import MainStatistics from './main-statistics/MainStatistics'
import MiddleStatistics from './middle-statistics/MiddleStatistics'

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
