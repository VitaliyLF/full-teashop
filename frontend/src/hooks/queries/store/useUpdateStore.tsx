// хуки для запросов и работы с store
// через tanstack query
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { storeService } from '@/services/store.services'

import { IStoreUpdate } from '@/shared/types/store.interface'

// хук запрос на обновление магазина
export const useUpdateStore = () => {
  // получаем магазин по id
  // можем назвать переменную как params и обращаться как params.storeId
  // или деструктурировать
  // useParams возвращает объект с параметрами маршрута где ключи это строчки и
  // мы говорим "Мой URL гарантированно содержит параметр storeId, и он всегда строка."
  // вот почему так типизируем

  // вообще useParams нам отдает динамический параметр
  // например /users/:id Где id это параметр в нашем случае это storeId динамический параметр и мы его берем через хук
  // это Route Params

  // еще есть Query Params все после ? /search?q=cat

  // Body Params в теле запроса { "email": "...", "password": "..." }
  const { storeId } = useParams<{ storeId: string }>()

  // Он нужен, чтобы вручную управлять кешем запросов.
  // Это объект, который хранит:
  // кеш всех запросов,
  // их статусы,
  // время жизни данных,
  // настройки запросов,
  // чтобы делать инвалидацию - Перезапрос данных вручную с сервера
  const queryClient = useQueryClient()

  // получение магазина
  const { data: store } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => storeService.getById(storeId),
  })

  // сама мутация на обновление
  const { mutate: updateStore, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ['update store'],
    mutationFn: (data: IStoreUpdate) => storeService.update(storeId, data),
    onSuccess() {
      // при обновлении динамические сразу обновляем и профиль юзера
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })

      toast.success('Магазин обновлен')
    },
    onError() {
      toast.error('Ошибка при обновлении магазина')
    },
  })

  return useMemo(
    () => ({ store, updateStore, isLoadingUpdate }),
    [store, updateStore, isLoadingUpdate],
  )
}
