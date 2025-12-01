import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Reviews from './widgets/Reviews'

export const metadata: Metadata = {
  title: 'Отзывы',
  ...NO_INDEX_PAGE,
}

const ReviewsPage = () => {
  return <Reviews />
}

export default ReviewsPage
