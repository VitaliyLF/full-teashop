import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { categoryService } from '@/services/category.services'

import { ICategoryInput } from '@/shared/types/category.interface'

export const useUpdateCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const queryClient = useQueryClient()

  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE
  const { mutate: updateCategory, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update category', categoryId],
    mutationFn: (data: ICategoryInput) => categoryService.update(categoryId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get categories for store dashboard'],
      })
      toast.success('Категория обновлена')
    },
    onError() {
      toast.error('Ошибка при обновлении категории')
    },
  })

  return useMemo(() => ({ updateCategory, isLoadingUpdate }), [updateCategory, isLoadingUpdate])
}
