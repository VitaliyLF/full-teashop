import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.services'

export const useDeleteCategory = () => {
  // тут именно берем динамический параметр самый последний в роутинге
  const { storeId, categoryId } = useParams<{ storeId: string; categoryId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete category'],
    mutationFn: () => categoryService.deleteCategory(categoryId),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get categories for store dashboard'],
      })
      toast.success('Категория удален')
      push(STORE_URL.categories(storeId))
    },
    onError() {
      toast.error('Ошибка при удалении категории')
    },
  })

  return useMemo(() => ({ deleteCategory, isLoadingDelete }), [deleteCategory, isLoadingDelete])
}
