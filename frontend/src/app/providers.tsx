'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// для дебагинга
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

// tanstack react query библиотека для запросов
// подключаем так по документациии
const queryClient = new QueryClient({
  // указываем настройки
  defaultOptions: {
    // эта настройка нужно что при изменении фокуса окна бразуера не происходил лишний запрос
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

// Сюда подключается все библиотеки провайдеры
const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
