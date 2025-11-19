'use client'

import Heading from '@/shared/ui/Heading'

import MainStatistics from './main-statistics/MainStatistics'

const Store = () => {
  return (
    <div className="wrapper p-6">
      <Heading title="Статистика" />
      <MainStatistics />
    </div>
  )
}

export default Store
