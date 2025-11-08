import { axiosClassic } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IColor, IColorInput } from '@/shared/types/color.interface'

// метод на получение цветов по id магазину
const getByStoreId = async (id: string) => {
  const { data } = await axiosClassic<IColor[]>({
    // серверный роутинг для цвета /colors/by-storeId/:id
    url: API_URL.colors(`/by-storeId/${id}`),
    method: 'GET',
  })

  return data || []
}

// метод на получение цвета по id
const getById = async (id: string) => {
  const { data } = await axiosClassic<IColor>({
    // серверный роутинг для цвета /colors/by-id/id
    url: API_URL.colors(`/by-id/${id}`),
    method: 'GET',
  })

  return data
}

// метод на создание цвета для магазина по его id
const create = async (data: IColorInput, storeId: string) => {
  const { data: createdColor } = await axiosClassic<IColor>({
    // серверный роутинг для цвета /colors/storeId
    url: API_URL.colors(`/${storeId}`),
    method: 'POST',
    data,
  })

  return createdColor
}

// метод на обновление цвета по его id
const update = async (id: string, data: IColorInput) => {
  const { data: updatedColor } = await axiosClassic<IColor>({
    // серверный роутинг для цвета /categories/id
    url: API_URL.colors(`/${id}`),
    method: 'PUT',
    data,
  })

  return updatedColor
}

// метод на удаление категории по его id
const deleteColor = async (id: string) => {
  const { data: deleteColor } = await axiosClassic<IColor>({
    // серверный роутинг для цвета /colors/id
    url: API_URL.colors(`/${id}`),
    method: 'DELETE',
  })

  return deleteColor
}

export const colorService = {
  getByStoreId,
  getById,
  create,
  update,
  deleteColor,
}
