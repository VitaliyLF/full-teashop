import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { reviewsService } from '@/services/review.services'

import { IReviewInput } from '@/shared/types/review.interface'

export const useCreateReview = (storeId: string) => {
  // если мы находимся на http://localhost:3000/product/:id
  // то тут он берет его из последнего параметра product т.е так как мы создаем на странице продукта отзыв
  // и находимся на динамической странице продукто то его id и берется из url
  const { id } = useParams<{ id: string }>()

  const queryClient = useQueryClient()

  const { mutate: createReview, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create review'],
    mutationFn: (data: IReviewInput) => reviewsService.create(data, storeId, id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      })

      toast.success('Отзыв создан')
    },
    onError() {
      toast.error('Ошибка при создании отзыва')
    },
  })

  return useMemo(() => ({ createReview, isLoadingCreate }), [createReview, isLoadingCreate])
}
