'use client'

import { ChevronsUpDown, DeleteIcon, Plus, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import CreateStoreModal from '@/components/ui/modals/CreateStoreModal'

import { STORE_URL } from '@/config/url.config'

import { useDeleteStore } from '@/hooks/queries/store/useDeleteStore'

import { IStore } from '@/shared/types/store.interface'

// будет принимать items это массив наших магазинов
interface StoreSwitcherProps {
  stores: IStore[]
}

const StoreSwitcher = ({ stores }: StoreSwitcherProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { deleteStore } = useDeleteStore()

  // то что будет происходить при выборе магазина
  const onStoreSelect = (storeId: string) => {
    setIsOpen(false)
    // в списке всех магазинов у пользователя при клике на нужный магазин меняеться url и мы переходим на нужный магазин
    router.push(STORE_URL.home(storeId), { scroll: false })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-52 cursor-pointer"
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Выберете магазин">
          <StoreIcon className="mr-2 size-4" />
          Текущий магазин
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Найти магазин..." />
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup heading="Магазины">
              {stores.map(({ id, title }) => (
                <CommandItem
                  className="text-sm flex items-center justify-between"
                  key={id}
                  onSelect={() => onStoreSelect(id)}>
                  <div className="flex items-center gap-2">
                    <StoreIcon className="size-4" />
                    <h2 className="line-clamp-1">{title}</h2>
                  </div>

                  <button className="cursor-pointer" onClick={() => deleteStore(id)}>
                    <DeleteIcon />
                  </button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CreateStoreModal>
                <CommandItem>
                  <Plus className="mr-2 size-4" />
                  Создать магазин
                </CommandItem>
              </CreateStoreModal>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
