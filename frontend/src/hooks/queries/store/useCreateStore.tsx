// хуки для запросов и работы с store
// через tanstack query
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { storeService } from '@/services/store.services'

import { IStoreCreate } from '@/shared/types/store.interface'

// хук запрос на создание магазина
export const useCreateStore = () => {
  // useRouter позволяет программно изменять маршруты внутри клиентских компонентов.
  // когда мы используем useRouter и router.push push принимает 2 параметра строку куда переводить и scroll boolean
  // Второй парметр в push это - scroll boolean.По умолчанию Next.js будет прокручиваться до верхней части страницы при переходе к новому маршруту.
  // Вы можете отключить это поведение, передав Scroll: false в router.push() или router.replace().
  const router = useRouter()

  // производим мутацию
  // data прокидывается через mutate(data) и попадает в функцию mutationFn
  const { mutate: createStore, isPending: isLoadingCreateStore } = useMutation({
    mutationKey: ['create store'],
    mutationFn: (data: IStoreCreate) => storeService.create(data),
    onSuccess(store) {
      // store это то что пришло в ответе при создании
      toast.success('Магазин создан')
      // переадресовываем его на главную страницу store после создания его
      router.push(STORE_URL.home(store.id))
    },
    onError() {
      toast.error('Ошибка при создании магазина')
    },
  })

  // возвращаем все это и обворачиваем в useMemo для оптимизации
  // при изменении createStore и isLoadingCreateStore
  // useMemo создает стабильность ссылок и нас не будет лишних ререндеров.
  return useMemo(() => ({ createStore, isLoadingCreateStore }), [createStore, isLoadingCreateStore])
}
