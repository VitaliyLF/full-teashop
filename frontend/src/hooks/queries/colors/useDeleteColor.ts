import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { colorService } from '@/services/color.services'

export const useDeleteColor = () => {
  const { storeId, colorId } = useParams<{ storeId: string; colorId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  const { mutate: deleteColor, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete product'],
    mutationFn: () => colorService.deleteColor(colorId),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get colors for store dashboard'],
      })
      toast.success('Цвет удален')
      push(STORE_URL.colors(storeId))
    },
    onError() {
      toast.error('Ошибка при удалении цвета')
    },
  })

  return useMemo(() => ({ deleteColor, isLoadingDelete }), [deleteColor, isLoadingDelete])
}
