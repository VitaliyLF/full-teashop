import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { reviewsService } from '@/services/review.services'

export const useGetReviews = () => {
  const { storeId } = useParams<{ storeId: string }>()

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['get reviews for store dashboard'],
    queryFn: () => reviewsService.getByStoreId(storeId),
  })

  return useMemo(() => ({ reviews, isLoading }), [reviews, isLoading])
}
