// на базе библиотеки bun add @tanstack/react-table
// для работы ее нужно установить
// дальше из доки shadcn ниже просто копируем разметку таблицы компонента

'use client'

// в доментации с таблицой можно делать сортировку ищем пример использования на сайте и добавляем нужные импорты
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'

import { Input } from '../form-elements/Input'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // создаем пропс по которому определяем через что у нас будет фильтроваться поиск
  filterKey?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
}: DataTableProps<TData, TValue>) {
  // копируем и заводим состояние для сортировки
  const [sorting, setSorting] = useState<SortingState>([])

  // копируем и заводим состояние для фильтрации
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // все штуки для сотрировки
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // все штуки для фильтрации
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      // подключаем состояния
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      {/* показываем этот поиск если задан тип поиска */}
      {filterKey && (
        <div className="search flex items-center py-4">
          {/* у нас будет поиск в цветах поиск по name а в store table поиск по title, т.е он может отличаться и делаем универсально и через
        пропсы прокидываем через что будет у нас поиск */}
          {/* В качестве ключа записываем не строчку по чем фильтровать getColumn('price') а filterKey т.е по опеределенном ключу который сверху приходит в компонент */}
          <Input
            placeholder="Поиск"
            value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn(filterKey)?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Ничего не найдено.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
