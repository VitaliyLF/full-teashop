'use client'

import Catalog from '@/components/ui/catalog/Catalog'

import { useProfile } from '@/hooks/userProfile'

const Favorites = () => {
  // получаем профиль
  const { user } = useProfile()

  if (!user) return null

  return (
    <div className="my-6">
      <Catalog title="Избранное" products={user.favorites} />
    </div>
  )
}

export default Favorites
