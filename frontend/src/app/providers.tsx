'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'
import { Toaster } from 'react-hot-toast'

// Сюда подключается все библиотеки провайдеры
const Providers = ({ children }: PropsWithChildren) => {
  // tanstack react query библиотека для запросов

  // подключаем так по документациии
  const [client] = useState(
    new QueryClient({
      // указываем настройки
      defaultOptions: {
        // эта настройка нужно что при изменении фокуса окна бразуера не происходил лишний запрос
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  )
  return (
    <QueryClientProvider client={client}>
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}

export default Providers
