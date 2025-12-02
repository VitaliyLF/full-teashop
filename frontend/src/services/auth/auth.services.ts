import { axiosClassic } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface'

import { removeFromStorage, saveTokensStorage } from './auth-token.services'

// Функция на логин или регистрацию
const main = async (type: 'login' | 'register', data: IAuthForm) => {
  // вызываем интерсептор классик
  const response = await axiosClassic<IAuthResponse>({
    // в качестве url вызываем API_URL это роутинг серверный
    url: API_URL.auth(`/${type}`),
    // указываем метод
    method: 'POST',
    // и прокидываем наши данные
    data,
  })

  // если все корректно и нам пришел токен то сохраняем токен в storage и в него прокидываем токен
  if (response.data.accessToken) saveTokensStorage(response.data.accessToken)

  return response
}

// Функция на получение новых токенов
const getNewTokens = async () => {
  const response = await axiosClassic<IAuthResponse>({
    // по этому url auth/login/access-token идет запрос на получения новых токенов
    url: API_URL.auth('/login/access-token'),
    method: 'POST',
  })

  if (response.data.accessToken) saveTokensStorage(response.data.accessToken)

  return response
}

// Функция на логаут из системы
const logout = async () => {
  // будет возвращаться boolean Значение
  const response = await axiosClassic({
    // по этому url auth/logout возвращает булевое значение
    url: API_URL.auth('/logout'),
    method: 'POST',
  })

  // если все нормально если мы вышли вызываем функцию на удаление accessToken
  if (response.data) removeFromStorage()

  return response
}

// Экспортируем объект
export const authService = {
  main,
  getNewTokens,
  logout,
}
