import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IUser } from '@/shared/types/user.interface'

// метод на получение профиля юзера только для авторизированных пользователей
const getProfile = async () => {
  // делаем деструктуризацию response чтобы обращаться к объекту по цепочке
  const { data } = await axiosWithAuth<IUser>({
    // серверный роутинг для юзера /users/profile
    url: API_URL.users('/profile'),
    method: 'GET',
  })

  return data
}

// метод на добавление заказа в избранное
const toggleFavorite = async (productId: string) => {
  const response = await axiosWithAuth<IUser>({
    // серверный роутинг для юзера /users/profile/favorites/productId
    url: API_URL.users(`/profile/favorites/${productId}`),
    method: 'PATCH',
  })

  return response
}

export const userService = {
  getProfile,
  toggleFavorite,
}
