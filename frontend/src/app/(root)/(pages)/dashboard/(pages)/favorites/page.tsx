import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Favorites from './widgets/Favorites'

export const metadata: Metadata = {
  title: 'Избранное',
  ...NO_INDEX_PAGE,
}

const FavoritesPage = async () => {
  return <Favorites />
}

export default FavoritesPage
