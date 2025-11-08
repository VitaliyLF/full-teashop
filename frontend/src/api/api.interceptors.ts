import axios, { CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '@/config/api.config'

import { getAccessToken, removeFromStorage } from '@/services/auth/auth-token.services'
import { authService } from '@/services/auth/auth.services'

import { errorCatch, getContentType } from './api.helper'

// дефолтные настройки для аксиоса
// эти настройки чтобы каждый раз не писать, url для запроса контент тайп и тд
const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  // вот тут указыва финкцию которую описали которая возвращает Content-type
  headers: getContentType(),
  // для работы с серверными куками
  withCredentials: true,
}

// это интерсептор который будет доступен всем
// т.е на получение продуктов может отправит запрос и авторизированный и не авторизированный пользователь
export const axiosClassic = axios.create(options)

// это интерсептор отличается потому что мы будем приклеплять токен к запросу
// а в ответе будем обрабатывать различные ошибки
export const axiosWithAuth = axios.create(options)

// в interceptors мы можем либо изменять настройки или обрабатывать ошибки
// изменяем axiosWithAuth
// у каждого interceptors есть два метода request и response
// request это запрос и тут при запросе крепим наш Bearer токен
axiosWithAuth.interceptors.request.use((config) => {
  // получаем accessToken
  const accessToken = getAccessToken()

  // Делаем проверку только если есть config.headers и accessToken
  // Тогда при авторизации вставляем строку с нашим accessToken
  if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

// делаем interceptors на ответ
// тут обрабатываем наши ошибки после response
// вот тут они принимает настройки и сразу их отдает и вот уже потом мы обрабатываем ошибки
axiosWithAuth.interceptors.response.use(
  (config) => config,
  // вторым параметром делаем ассихронную функцию error
  async (error) => {
    // вот сюда записываем ошибку из config
    const originalRequest = error.config

    // дальше делаем проверки
    // подходит ли нам какое то условие чтобы обновить токены

    // какая то ошибка с авторизацией
    // или  jwt expired наш токен закончился
    // или если ошибка jwt must be provided нам нужно прокинуть рефреш токен а мы его не прокинули

    // и при этом все должен прокинут error.config
    // и этот запрос не должен быть повторяемым
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      // если какое из этих условий сработало
      // ставим в конфиг что запрос повторяемый
      originalRequest._isRetry = true
      // обрабатываем саму ошибку
      try {
        // вызываем новый токен
        // на бекенде есть такая функция authServices
        // берем новые токены
        await authService.getNewTokens()
        // делаем запрос на сервер с конфигом
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        // если же все равно ошибка
        // проверяем на то истек ли токен
        // тогда делаем логаут юзера
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }
    // выбрасываем ошибку
    throw error
  },
)

// делаем експорт или просто export у каждой
// export { axiosClassic, axiosWithAuth }
