import { IMainStatistics } from '@/shared/types/statistics.interface'
import { Card, CardHeader, CardTitle } from '@/shared/ui/Card'

import { getIcon } from '../../utils/statistics.util'

interface IMainStatisticsItemProps {
  item: IMainStatistics
}

const MainStatisticsItem = ({ item }: IMainStatisticsItemProps) => {
  // делаем с большшой буквы поскольку это компонент
  const Icon = getIcon(item.id)

  return (
    <Card className="card">
      <CardHeader className="header">
        <CardTitle>11</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default MainStatisticsItem
