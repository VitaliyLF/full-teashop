import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ExternalLink, MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu'

import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

export interface IProductColumn {
  id: string
  title: string
  price: string
  category: string
  color: string
  storeId: string
}

// создаем колонки для нашей таблици
// типизируем ее из библиотки
// лучше посмотреть как работает библиотека
export const columns: ColumnDef<IProductColumn>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          // на клик навешиваем из объекта toggleSorting в который прокидываем функцию getIsSorted
          // из того же column если равна 'asc' от большего к меньшему сортировка
          // собственно так будет происходить сортировка по клику
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Название
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Цена
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Категория
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Цвет
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    // тут много настроек нужно смотреть в документацию
    // cell это само содержимое столбиков в таблице
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.color}
        {/* кружочек куда мы выводим именно цвет значение */}
        <div
          className="size-4 rounded-full border"
          style={{
            backgroundColor: row.original.color,
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Действия',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <Link href={PUBLIC_URL.product(row.original.id)} target="_blank">
            <DropdownMenuItem>
              <ExternalLink className="size-4 mr-2" />
              Страница с продуктом
            </DropdownMenuItem>
          </Link>
          <Link
            href={STORE_URL.productsEdit(row.original.storeId, row.original.id)}
            target="_blank">
            <DropdownMenuItem>
              <Pencil className="size-4 mr-2" />
              Изменить
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
