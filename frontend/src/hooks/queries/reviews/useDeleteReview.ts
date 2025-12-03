import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { reviewsService } from '@/services/review.services'

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteReview, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete review'],
    mutationFn: (reviewId: string) => reviewsService.deleteReview(reviewId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      })

      toast.success('Отзыв удален')
    },
    onError() {
      toast.error('Ошибка при удалении отзыва')
    },
  })

  return useMemo(() => ({ deleteReview, isLoadingDelete }), [deleteReview, isLoadingDelete])
}
