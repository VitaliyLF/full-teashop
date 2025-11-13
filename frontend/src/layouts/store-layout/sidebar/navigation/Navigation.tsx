'use client'
import { Album, BarChart, FolderKanban, PaintBucket, Settings, Star } from 'lucide-react'
import { useParams } from 'next/navigation'

import { STORE_URL } from '@/config/url.config'

import MenuItem from './MenuItem'
import { IMenuItem } from './menu.interface'

const Navigation = () => {
  // получаем параметры из Url
  // параметр это как называется динамическая папка
  // через хук useParams мы можем получить динамические параметры сразу в компоненте
  // useParams возвращает объект динамических параметров
  // useParams используется когда нужно получить значения [param] из маршрута
  const params = useParams<{ storeId: string }>()

  // массив с роутами
  // берем из url параметры и прокидываем их в url
  // получается /store/params в каждом
  const routes: IMenuItem[] = [
    {
      id: 1,
      icon: BarChart,
      // store/:id
      href: STORE_URL.home(params.storeId),
      value: 'Статистика',
    },
    {
      id: 2,
      icon: FolderKanban,
      // store/:id/products
      href: STORE_URL.products(params.storeId),
      value: 'Товары',
    },
    {
      id: 3,
      icon: Album,
      // store/:id/categories
      href: STORE_URL.categories(params.storeId),
      value: 'Категории',
    },
    {
      id: 4,
      icon: PaintBucket,
      // store/:id/colors
      href: STORE_URL.colors(params.storeId),
      value: 'Цвета',
    },
    {
      id: 5,
      icon: Star,
      // store/:id/reviews
      href: STORE_URL.reviews(params.storeId),
      value: 'Отзывы',
    },
    {
      id: 6,
      icon: Settings,
      // store/:id/settings
      href: STORE_URL.settings(params.storeId),
      value: 'Настройка магазина',
    },
  ]

  return (
    <div className="wrapper flex flex-col w-full flex-1">
      <div className="navigation flex flex-col w-full gap-3">
        {routes.map((route) => (
          <MenuItem key={route.id} {...route} />
        ))}
      </div>
    </div>
  )
}

export default Navigation
