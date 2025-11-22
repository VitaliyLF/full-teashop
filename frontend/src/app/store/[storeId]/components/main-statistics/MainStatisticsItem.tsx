import { createElement } from 'react'
import CountUp from 'react-countup'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

import { IMainStatistics } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

import { getIcon } from '../../utils/statistics.util'

// не лучший вариант, можно просто типизировать пропы как IMainStatistics
// оставил так чтобы знать что можно так делать
// type TMainStatisticsItemProps = IMainStatistics & {} дальше чтобы расширять
type TMainStatisticsItemProps = IMainStatistics

const MainStatisticsItem = ({ name, id, value }: TMainStatisticsItemProps) => {
  // делаем с большшой буквы поскольку это компонент
  // функция getIcon проходиться по id и подставляет нужную иконку
  // такое себе потому что рендерить комопнент не очень в начале а потом использовать еще в разметке
  // поэтому приходиться использовать createElement
  const Icon = getIcon(id)

  return (
    <Card className="card drop-shadow-sm gap-2 p-6">
      <CardHeader className="header flex flex-row items-center justify-between p-0">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        {createElement(Icon, { className: 'size-5' })}
      </CardHeader>
      <CardContent className="content p-0">
        <h2 className="text-lg font-medium">
          {id !== 1 ? <CountUp end={value} /> : <CountUp end={value} formattingFn={formatPrice} />}
        </h2>
      </CardContent>
    </Card>
  )
}

export default MainStatisticsItem
