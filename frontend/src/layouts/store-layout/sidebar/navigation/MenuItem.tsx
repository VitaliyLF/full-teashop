'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IMenuItem } from './menu.interface'
import { cn } from '@/lib/utils'

// для того чтобы отрендерить иконку сначал переменновываем ее с большой буквы
// дальше рендерим как компонент
const MenuItem = ({ href, icon: Icon, value }: IMenuItem) => {
  // чтобы проверять на активный элемент
  // тут будет /store/:id или /store/:id/product и тд
  // Возвращает текущий полный путь (URL path) в виде строки без query-параметров
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        [
          'route flex items-center gap-3 text-slate-500 text-sm',
          'font-medium py-2.5 px-3 rounded-lg hover:bg-blue-200/20',
          'hover:text-blue-600 hover:drop-shadow-sm bg-transparent transition-all duration-200',
        ],
        {
          'active text-sm text-blue-500 bg-blue-200/20 hover:bg-blue-200/20 hover:text-blue-600':
            pathname === href,
        },
      )}
      href={href}>
      <Icon className="size-5" />
      {value}
    </Link>
  )
}

export default MenuItem
