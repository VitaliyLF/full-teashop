// Глобальные хуки
import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.services'

// хук для получения профиля пользователя много где будем использовать
export const useProfile = () => {
  // запрос на получение
  // из за того что мы в userService.getProfile() сделали деструктуризацию респонса и назвали ее как data
  // то тут же ее и получаем data и переменовываем ее в user
  const { data: user, isLoading } = useQuery({
    // это уникальный ключ, который помогает React Query отличать одну мутацию от другой.
    queryKey: ['profile'],
    // в функцию указываем функцию получения профиля по роуту /users/profile
    queryFn: () => userService.getProfile(),
  })

  return { user, isLoading }
}
