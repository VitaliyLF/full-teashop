import type { Metadata } from 'next'
import { Suspense } from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Dashboard from './widgets/Dashboard'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  ...NO_INDEX_PAGE,
}

// Когда ты вызываешь useSearchParams() (или любой другой клиентский хук, читающий параметры запроса) внутри дерева,
// которое Next.js пытается пререндерить как статическое (Server Component),
// фреймворк не может корректно сделать «частичный» переход — чтение параметров зависит от браузера/клиента.

//  Вся страница DashboardPage остаётся статической,
// но внутри неё часть, которая обёрнута в <Suspense>, рендерится динамически (на клиенте).

// Dashboard компонент
// Он будет выполняться только в браузере (клиентский JS).
// Next.js не может заранее знать, что он вернёт.
// Поэтому он подгружается отдельно и монтируется после загрузки JS.

// Suspense создаёт границу:
// «Вот эта часть страницы — динамическая (рендерится позже на клиенте),
// а всё остальное можно отрисовать сразу (на сервере).»

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Dashboard />
    </Suspense>
  )
}

export default DashboardPage
