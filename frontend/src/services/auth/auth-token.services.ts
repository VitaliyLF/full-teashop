import Cookies from 'js-cookie'

// Описываем enum Для токенов
export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken',
}

// Функция на получение accessToken из куки
export const getAccessToken = () => {
  // получаем из куки accessToken с помощью библиотеки
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

// Сохранение в localStorage accessToken из куки
export const saveTokensStorage = (accessToken: string) => {
  // первый параметр это 'name' второй сам токен 'value' и настройки
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    // указываем домен
    domain: process.env.APP_DOMAIN,
    // Cookie отправляются только, когда пользователь находится на этом же домене (никаких межсайтовых запросов). Самый безопасный режим.
    sameSite: 'strict',
    // срок жизни истечет через 1 день
    expires: 1,
  })
}

// удаление куки из localStorage
// этот метод нужен вызываем после успешного выхода пользователя из системы
// у при успешном выходя у нас на сервере удаляется рефреш токен а тут на клиенте мы удаляем accessToken
export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
