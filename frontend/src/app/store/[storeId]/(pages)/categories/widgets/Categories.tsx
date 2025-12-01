'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'

import { formatDate } from '@/utils/date/format-date'

import { ICategoryColumn, categoryColumns } from '../features/category-form/CategoryColumns'

const Categories = () => {
  const { storeId } = useParams<{ storeId: string }>()

  const { categories, isLoading } = useGetCategories()

  const formattedCategories: ICategoryColumn[] = categories
    ? categories.map((category) => ({
        id: category.id || '',
        createdAt: formatDate(category.createdAt),
        title: category.title,
        storeId: category.storeId,
      }))
    : []

  return (
    <div className="wrapper p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
            <Heading
              title={`Категории (${categories?.length})`}
              description="Все категории вашего магазина"
            />
            <div className="buttons">
              <Link href={STORE_URL.categoriesCreate(storeId)}>
                <Button variant="primary">
                  <Plus />
                  Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={categoryColumns} data={formattedCategories} filterKey="title" />
          </div>
        </>
      )}
    </div>
  )
}

export default Categories
