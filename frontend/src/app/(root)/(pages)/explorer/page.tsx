import type { Metadata } from 'next'
import { Suspense } from 'react'

import { productService } from '@/services/product.services'

import Explorer from './widgets/Explorer'

export const metadata: Metadata = {
  title: 'Каталог товаров',
}

export const revalidate = 60

// функция для получения всех продуктов
const getProducts = async () => {
  const data = await productService.getAll()

  return data
}

const ExplorerPage = async () => {
  const products = await getProducts()

  return (
    <>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Explorer products={products} />
      </Suspense>
    </>
  )
}

export default ExplorerPage
