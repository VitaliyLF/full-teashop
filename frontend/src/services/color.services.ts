import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IColor, IColorInput } from '@/shared/types/color.interface'

// метод на получение цветов по id магазину
const getByStoreId = async (storeId: string) => {
  const { data } = await axiosWithAuth<IColor[]>({
    // серверный роутинг для цвета /colors/by-storeId/:id
    url: API_URL.colors(`/by-storeId/${storeId}`),
    method: 'GET',
  })

  return data || []
}

// метод на получение цвета по id
const getById = async (colorId: string) => {
  const { data } = await axiosWithAuth<IColor>({
    // серверный роутинг для цвета /colors/by-id/id
    url: API_URL.colors(`/by-id/${colorId}`),
    method: 'GET',
  })

  return data
}

// метод на создание цвета для магазина по его id
const create = async (data: IColorInput, storeId: string) => {
  const { data: createdColor } = await axiosWithAuth<IColor>({
    // серверный роутинг для цвета /colors/storeId
    url: API_URL.colors(`/${storeId}`),
    method: 'POST',
    data,
  })

  return createdColor
}

// метод на обновление цвета по его id
const update = async (colorId: string, data: IColorInput) => {
  const { data: updatedColor } = await axiosWithAuth<IColor>({
    // серверный роутинг для цвета /categories/id
    url: API_URL.colors(`/${colorId}`),
    method: 'PUT',
    data,
  })

  return updatedColor
}

// метод на удаление категории по его id
const deleteColor = async (colorId: string) => {
  const { data: deleteColor } = await axiosWithAuth<IColor>({
    // серверный роутинг для цвета /colors/id
    url: API_URL.colors(`/${colorId}`),
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
