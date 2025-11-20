// хуки для запросов и работы с store
// через tanstack query
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { storeService } from '@/services/store.services'

import { IStoreCreate } from '@/shared/types/store.interface'

// Смысл react-query это серверный стейт менедж
// мы только получаем данные с сервера и только их отображаем при этом никак не меняя их только риад онли
// данные кешируется на клиенте при этом мы поэтому ничего нового не отправляем на сервер
// есть два способа изменить данные на сервере

// это инвалидация мы просто говорим серверу обнови нам данные на клиенте
// инвалидация - перезапрос данных с сервера

// и мутация post,put, запросы при этом все равно работает инвалидация
// мутация - инвалдиция - перезапрос данных с сервера

// инвадидация данных идет по ключам поэтому их обязательно нужно указывать
// умеют запрашивать данные по таймеру (polling)
// продвинутая работа с кешом
// retry в случае ошибок

// хук запрос на создание магазина
export const useCreateStore = () => {
  // useRouter позволяет программно изменять маршруты внутри клиентских компонентов.
  // когда мы используем useRouter и router.push push принимает 2 параметра строку куда переводить и scroll boolean
  // Второй парметр в push это - scroll boolean.По умолчанию Next.js будет прокручиваться до верхней части страницы при переходе к новому маршруту.
  // Вы можете отключить это поведение, передав Scroll: false в router.push() или router.replace().
  const router = useRouter()

  // логика чтобы когда магазин создан не нужно было обновлять страницу чтобы это увидеть в выпадающем списке
  // это называется ревалидация данных
  // подключаем клиента
  const queryClient = useQueryClient()

  // производим мутацию
  // data прокидывается через mutate(data) и попадает в функцию mutationFn
  const { mutate: createStore, isPending: isLoadingCreateStore } = useMutation({
    mutationKey: ['create store'],
    mutationFn: (data: IStoreCreate) => storeService.create(data),
    // onSuccess это response ответ данные с сервера при ответе
    onSuccess(store) {
      // перед тем как выводим toast будет переотравлять запрос на обновления профиля
      // т.е в onSuccess нам приходит ответ и мы отправляем запрос и смотри что за данные у юзера
      // чтобы сразу получать обновленые данные и сразу их отображать на ui
      // Ревалидация будет срабатывает при успешном запросе и мы будет обновлять данные без обновления страницы
      // это инвалидация мы просто говорим серверу обнови нам данные на клиенте
      // инвалидация - перезапрос данных с сервера
      queryClient.invalidateQueries({
        // этот ключ уже есть и логика на нем это получения profile юзера
        // и получается тут мы отправляем запрос на обновления юзера
        queryKey: ['profile'],
      })

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
