import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { useProfile } from '@/hooks/userProfile'

import { userService } from '@/services/user.services'

import { IProduct } from '@/shared/types/product.interface'

interface IFavoriteButtonProps {
  product: IProduct
}

const FavoriteButton = ({ product }: IFavoriteButtonProps) => {
  const { user } = useProfile()

  const queryClient = useQueryClient()

  // делаем для ревалидации
  const { mutate, isPending } = useMutation({
    mutationKey: ['toggle favorite'],
    mutationFn: () => userService.toggleFavorite(product.id),
    onSuccess() {
      // получаем обновленый запрос профиля
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
  })

  if (!user) return null

  // user.favorites массив избранных у пользователя
  // some(...) есть ли хотя бы один элемент, который подходит под условие возвращает true false

  // (favorite) => favorite.id === product.id условие
  // берём каждый элемент favorite из массива favorites
  // сравниваем его id с product.id
  const isExists = user.favorites.some((favorite) => favorite.id === product.id)

  return (
    <Button variant="secondary" size="icon" onClick={() => mutate()} disabled={isPending}>
      {isExists ? (
        <span>
          {/* Товар в избранном */}
          <Heart color="#F43F5E" className="size-5 text-rose-500 fill-rose-500" />
        </span>
      ) : (
        <span>
          {/* Товара не в избранном */}
          <Heart className="size-5 text-gray-500" />
        </span>
      )}
    </Button>
  )
}

export default FavoriteButton
