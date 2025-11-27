import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { colorService } from '@/services/color.services'

import { IColorInput } from '@/shared/types/color.interface'

export const useUpdateColor = () => {
  const { colorId } = useParams<{ colorId: string }>()

  const queryClient = useQueryClient()

  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE
  const { mutate: updateColor, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update color', colorId],
    mutationFn: (data: IColorInput) => colorService.update(colorId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        // делаем один ключ для инвалидации
        queryKey: ['get colors for store dashboard'],
      })
      toast.success('Цвет обновлен')
    },
    onError() {
      toast.error('Ошибка при обновлении цвета')
    },
  })

  return useMemo(() => ({ updateColor, isLoadingUpdate }), [updateColor, isLoadingUpdate])
}
