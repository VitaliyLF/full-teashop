'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { IColor } from '@/shared/types/color.interface'

import { formatDate } from '@/utils/date/format-date'

import { colorsColumns } from './components/ColorsColumns'

const Colors = () => {
  const { storeId } = useParams<{ storeId: string }>()

  const { colors, isLoading } = useGetColors()

  // нужно для вывода в таблицу
  // приводи в нужный формат наши данные
  const formattedColors: IColor[] = colors
    ? colors.map((color) => ({
        id: color.id,
        createdAt: formatDate(color.createdAt),
        name: color.name,
        value: color.value,
        storeId: color.storeId,
      }))
    : []

  return (
    <div className="wrapper p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
            <Heading title={`Цвета (${colors?.length})`} description="Все цвета вашего магазина" />
            <div className="buttons">
              <Link href={STORE_URL.colorsCreate(storeId)}>
                <Button variant="primary">
                  <Plus />
                  Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={colorsColumns} data={formattedColors} filterKey="name" />
          </div>
        </>
      )}
    </div>
  )
}

export default Colors
