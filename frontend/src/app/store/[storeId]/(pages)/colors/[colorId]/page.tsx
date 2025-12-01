import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ColorEdit from './ColorEdit'

export const metadata: Metadata = {
  title: 'Настройка цвета',
  ...NO_INDEX_PAGE,
}

const ProductEditPage = () => {
  return <ColorEdit />
}

export default ProductEditPage
