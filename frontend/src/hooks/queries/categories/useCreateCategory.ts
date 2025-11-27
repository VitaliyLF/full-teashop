import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.services'

import { ICategoryInput } from '@/shared/types/category.interface'

export const useCreateCategory = () => {
  const { storeId } = useParams<{ storeId: string }>()
  const router = useRouter()

  const queryClient = useQueryClient()

  // используем useMutation только с Идемпотентные запросами
  // POST
  // PUT
  // DELETE
  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE.
  const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create product', storeId],
    // серверный роутинг для категорий store/:storeId/categories/by-storeId/:id
    mutationFn: (data: ICategoryInput) => categoryService.create(storeId, data),
    onSuccess() {
      // после успеха мы обновляет category
      // invalidateQueries чтобы делать инвалидацию - Перезапрос данных вручную с сервера
      // делаем один ключ для инвалидации
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard'],
      })
      toast.success('Категория создана')
      router.push(STORE_URL.categories(storeId))
    },
    onError() {
      toast.error('Ошибка при создании категории')
    },
  })

  return useMemo(() => ({ createCategory, isLoadingCreate }), [createCategory, isLoadingCreate])
}
