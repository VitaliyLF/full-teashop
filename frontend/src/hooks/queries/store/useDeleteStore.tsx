// хуки для запросов и работы с store
// через tanstack query
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_URL } from '@/config/url.config'

import { storeService } from '@/services/store.services'

// хук запрос на удаление магазина
// делаем флаг с редеректом на домашнюю страницу по дефолту тру
// export const useDeleteStore = (redirectToHome: boolean = true) => {

// можно делать объект с настройками как показано ниже
export const useDeleteStore = (options?: { redirectToHome?: boolean }) => {
  const { storeId } = useParams<{ storeId: string }>()

  const queryClient = useQueryClient()

  const { push } = useRouter()

  // по дефолту тру
  const redirect = options?.redirectToHome ?? true

  // производим мутацию
  const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete store'],
    mutationFn: () => storeService.deleteStore(storeId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })

      toast.success('Магазин удален')

      if (redirect) {
        push(PUBLIC_URL.home())
      }
    },
    onError() {
      toast.error('Ошибка при удалении магазина')
    },
  })

  return useMemo(() => ({ deleteStore, isLoadingDelete }), [deleteStore, isLoadingDelete])
}
