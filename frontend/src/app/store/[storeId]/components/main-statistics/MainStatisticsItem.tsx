import { createElement } from 'react'
import CountUp from 'react-countup'

import { IMainStatistics } from '@/shared/types/statistics.interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'

import { formatPrice } from '@/utils/string/format-price'

import { getIcon } from '../../utils/statistics.util'

interface IMainStatisticsItemProps {
  item: IMainStatistics
}

const MainStatisticsItem = ({ item }: IMainStatisticsItemProps) => {
  // делаем с большшой буквы поскольку это компонент
  // функция getIcon проходиться по id и подставляет нужную иконку
  // такое себе потому что рендерить комопнент не очень в начале а потом использовать еще в разметке
  // поэтому приходиться использовать createElement
  const Icon = getIcon(item.id)

  return (
    <Card className="card drop-shadow-sm gap-2 p-6">
      <CardHeader className="header flex flex-row items-center justify-between p-0">
        <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
        {createElement(Icon, { className: 'size-5' })}
      </CardHeader>
      <CardContent className="content p-0">
        <h2 className="text-lg font-medium">
          {item.id !== 1 ? (
            <CountUp end={item.value} />
          ) : (
            <CountUp end={item.value} formattingFn={formatPrice} />
          )}
        </h2>
      </CardContent>
    </Card>
  )
}

export default MainStatisticsItem
