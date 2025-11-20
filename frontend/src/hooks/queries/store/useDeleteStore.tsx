// хуки для запросов и работы с store
// через tanstack query
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { storeService } from '@/services/store.services'

// хук запрос на удаление магазина
export const useDeleteStore = () => {
  const queryClient = useQueryClient()

  // производим мутацию
  const { mutate: deleteStore } = useMutation({
    mutationKey: ['delete store'],
    mutationFn: (id: string) => storeService.deleteStore(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })

      toast.success('Магазин Удален')
    },
    onError() {
      toast.error('Ошибка при удалении магазина')
    },
  })

  return useMemo(() => ({ deleteStore }), [deleteStore])
}
