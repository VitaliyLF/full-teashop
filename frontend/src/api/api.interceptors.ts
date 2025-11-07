import { CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '@/config/api.config'

import { getContentType } from './api.helper'

// дефолтные настройки для аксиоса
// эти настройки чтобы каждый раз не писать, url для запроса контент тайп и тд
const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  // вот тут указыва финкцию которую описали которая возвращает Content-type
  headers: getContentType(),
  // для работы с серверными куками
  withCredentials: true,
}
