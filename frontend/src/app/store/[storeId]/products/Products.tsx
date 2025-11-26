'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { STORE_URL } from '@/config/url.config'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

import { formatPrice } from '@/utils/string/format-price'

import { IProductColumn, productColumns } from './components/ProductColumns'

const Products = () => {
  // подучаем динамический параметр storeId
  const { storeId } = useParams<{ storeId: string }>()

  // получаем  продукты по динамическому id магазина
  // /products/by-storeId/:storeId
  const { products, isLoading } = useGetProducts()

  // нужно для вывода в таблицу
  // приводи в нужный формат наши данные
  const formattedProducts: IProductColumn[] = products
    ? products.map((product) => ({
        id: product.id || '',
        title: product.title || '',
        price: formatPrice(product.price),
        category: product.category.title || '',
        color: product.color.value || '',
        storeId: product.storeId || '',
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
              title={`Товары (${products?.length})`}
              description="Все товары вашего магазина"
            />
            <div className="buttons">
              <Link href={STORE_URL.productsCreate(storeId)}>
                <Button variant="primary">
                  <Plus />
                  Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <DataTable columns={productColumns} data={formattedProducts} filterKey="title" />
          </div>
        </>
      )}
    </div>
  )
}

export default Products
