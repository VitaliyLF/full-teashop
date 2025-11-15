'use client'

import Image from 'next/image'
import Link from 'next/link'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/userProfile'

import Loader from '@/shared/ui/Loader'

import MobileSidebar from '../sidebar/MobileSidebar'

import StoreSwitcher from './StoreSwitcher'

const Header = () => {
  // получаем user по профилю
  const { user, isLoading } = useProfile()

  return (
    <header className="header p-6 gap-4 h-full flex items-center bg-white border-b">
      <MobileSidebar />
      <div className="header menu flex items-center gap-4 ml-auto">
        {isLoading ? (
          // показываем Loader при загрузки
          <Loader size="sm" />
        ) : (
          user && (
            // если есть user тогда рендрим ссылку на дашборк с аватаркой юзера
            // в StoreSwitcher прокидываем созданные юзером массив магазинов
            // каждый юзер по задумке сайта может создавать в админке множество своих магазинов
            <>
              <StoreSwitcher stores={user.stores} />
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  className="rounded-full"
                  src={user.picture}
                  alt={user.name}
                  width={42}
                  height={42}
                />
                <span>{user.name}</span>
              </Link>
            </>
          )
        )}
      </div>
    </header>
  )
}

export default Header
