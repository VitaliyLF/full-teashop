//Типы для авторизации
import { IUser } from './user.interface'

// это типизация полей формы
export interface IAuthForm {
  name: string
  email: string
  password: string
}

// то что приходит в ответе после успещной авторизации
export interface IAuthResponse {
  user: IUser
  accessToken: string
  // рефреш токен не приходит он записывается как серверная кука
}
