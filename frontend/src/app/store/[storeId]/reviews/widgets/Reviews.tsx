'use client'

import Heading from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews'

import { formatDate } from '@/utils/date/format-date'

import { IReviewColumn, reviewsColumns } from '../ReviewsColumns'

const Reviews = () => {
  const { reviews, isLoading } = useGetReviews()

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map((review) => ({
        id: review.id || '',
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating })
          .map(() => '⭐')
          .join(' '),
        username: review.user.name,
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
              title={`Отзывы (${reviews?.length})`}
              description="Все отзывы вашего магазина"
            />
          </div>
          <div className="mt-6">
            <DataTable columns={reviewsColumns} data={formattedReviews} />
          </div>
        </>
      )}
    </div>
  )
}

export default Reviews
