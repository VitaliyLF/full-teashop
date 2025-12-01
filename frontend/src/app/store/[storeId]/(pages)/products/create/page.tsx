import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CreateProduct from './CreateProduct'

export const metadata: Metadata = {
  title: 'Создание Товара',
  ...NO_INDEX_PAGE,
}

const CreateProductPage = () => {
  return <CreateProduct />
}

export default CreateProductPage
