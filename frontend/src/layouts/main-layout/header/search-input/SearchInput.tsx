'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/form-elements/Input'

import { PUBLIC_URL } from '@/config/url.config'

const SearchInput = () => {
  // делаем состояние
  const [searchTerm, setSearchTerm] = useState('')

  // делаем роутер и будем пушить на то что пользователь найдет в инпуте
  const router = useRouter()

  const handleSearch = () => {
    router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
  }

  return (
    <div className="form flex items-center relative">
      <Input
        className="rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
        placeholder="Поиск товаров"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <Button className="rounded-l-none" variant="primary" onClick={handleSearch}>
        <Search className="size-4" />
      </Button>
    </div>
  )
}

export default SearchInput
