import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/Chart'

import { IMonthlySales } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

// Для того чтобы подключить компонент Chart нужно описать его конфиг
const chartConfig = {
  // это объекты с разными названием их может быть много например desktop и mobile (в нашем случае первый value мы можем сами как хотим называть)
  // в каждом их этих объектов мы указываем настройки есть еще icon и theme
  // мы пожем добавить в конфиг tw переменные с цветом и использовать тут
  value: {
    // текст для тултипа при наведении на график
    label: 'Прибыль',
    // цвет в тултипе
    color: '#3B82F6',
    // color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface OverviewProps {
  data: IMonthlySales[]
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <Card>
      <CardHeader className="header flex flex-col items-stretch space-y-0 p-4 border-b">
        <CardTitle className="title text-xl font-medium tracking-[0.1px] line-clamp-1">
          Прибыль
        </CardTitle>
      </CardHeader>
      {/* Указываем на chard график */}
      <CardContent>
        {/* Указываем ChartContainer это обязательно и config */}
        <ChartContainer config={chartConfig} className="aspect-auto h-[310px] w-full">
          {/* Внутри уже используем компонент нужный нам chart круг диаграмма и тд */}
          {/* AreaChart импортирует из recharts */}
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}>
            {/* CartesianGrid сам график */}
            <CartesianGrid vertical={false} />
            {/* XAxis то что будет находиться под нашей статистикой */}
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            {/* Тултип при наведении */}
            <ChartTooltip
              content={<ChartTooltipContent labelFormatter={formatPrice} indicator="dot" />}
            />
            {/* это то что с бекенда получаем именно в объекте data которая приходит в компонент пропом */}
            {/* указываем ключ строку в поле потом fill с переменной и названием ключа */}
            {/* здесь из конфига указываем в dataKey поле и цвета для этого поля */}
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              stroke="var(--color-value)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Overview
