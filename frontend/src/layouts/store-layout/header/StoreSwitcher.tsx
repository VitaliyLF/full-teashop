'use client'

import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { STORE_URL } from '@/config/url.config'

import { IStore } from '@/shared/types/store.interface'
import { Button } from '@/shared/ui/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/Command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'
import CreateStoreModal from '@/shared/ui/modals/CreateStoreModal'

// будет принимать items это массив наших магазинов
interface StoreSwitcherProps {
  stores: IStore[]
}

const StoreSwitcher = ({ stores }: StoreSwitcherProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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
                <CommandItem className="text-sm" key={id} onSelect={() => onStoreSelect(id)}>
                  <StoreIcon className="mr-2 size-4" />
                  <h2 className="line-clamp-1">{title}</h2>
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
