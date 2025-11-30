import type { Metadata } from 'next'

// import { notFound } from 'next/navigation'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ProductEdit from './ProductEdit'

export const metadata: Metadata = {
  title: 'Настройки товара',
  ...NO_INDEX_PAGE,
}

// ради теста делаем на самой главной странице получение динамического роута и прокидываем в компонент
// а не через хук useParams
const ProductEditPage = () => {
  return <ProductEdit />
}

export default ProductEditPage
