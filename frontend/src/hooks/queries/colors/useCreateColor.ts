import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { colorService } from '@/services/color.services'

import { IColorInput } from '@/shared/types/color.interface'

export const useCreateColor = () => {
  const { storeId } = useParams<{ storeId: string }>()
  const { push } = useRouter()

  const queryClient = useQueryClient()

  // используем useMutation только с Идемпотентные запросами
  // POST
  // PUT
  // DELETE
  // useMutation — для изменения данных, то есть POST / PUT / PATCH / DELETE.
  const { mutate: createColor, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create color', storeId],
    mutationFn: (data: IColorInput) => colorService.create(data, storeId),
    onSuccess() {
      // после успеха мы обновляет products
      // invalidateQueries чтобы делать инвалидацию - Перезапрос данных вручную с сервера
      // делаем один ключ для инвалидации
      queryClient.invalidateQueries({
        queryKey: ['get colors for store dashboard'],
      })
      toast.success('Цвет создан')
      push(STORE_URL.colors(storeId))
    },
    onError() {
      toast.error('Ошибка при создании цвета')
    },
  })

  return useMemo(() => ({ createColor, isLoadingCreate }), [createColor, isLoadingCreate])
}
