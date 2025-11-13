import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Store from './components/Store'

export const metadata: Metadata = {
  title: 'Управление магазином',
  ...NO_INDEX_PAGE,
}

const StorePage = () => {
  return <Store />
}

export default StorePage
