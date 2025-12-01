'use client'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import CreateStoreModal from '@/components/ui/modals/CreateStoreModal'

import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/userProfile'

import HeaderCard from './header-card/HeaderCard'

const HeaderMenu = () => {
  const { user, isLoading } = useProfile()

  return (
    <div className="hidden items-center gap-2 ml-auto lg:flex">
      {/* Корзина */}
      <HeaderCard />
      {/* Ссылка на каталог */}
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Каталог</Button>
      </Link>
      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
          {/* Ссылка на избранное */}
          {/*  если есть юзаер выводим ссылки на избранное */}
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Избранное</Button>
          </Link>
          {/* Ссылка на Мои магазины */}
          {/*  если у юзера есть магазины выводим ссылку на первый магазин юзера иначе модалку на создания */}
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">Мои магазины</Button>
            </Link>
          ) : (
            <CreateStoreModal>
              <Button variant="ghost">Создать магазин</Button>
            </CreateStoreModal>
          )}
          {/* Ссылка на Дашборд */}
          {/* выводим аватарку юзера и ссылку с урлом на дашборд */}
          <Link href={DASHBOARD_URL.home()}>
            <Image
              className="rounded-full"
              src={user.picture}
              alt={user.name}
              width={42}
              height={42}
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button variant="primary">
            <LogOut className="size-4" />
            Войти
          </Button>
        </Link>
      )}
    </div>
  )
}

export default HeaderMenu
