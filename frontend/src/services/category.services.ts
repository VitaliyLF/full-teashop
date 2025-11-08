import { axiosClassic } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

// метод на получение категории по id магазину
const getByStoreId = async (id: string) => {
  const { data } = await axiosClassic<ICategory[]>({
    // серверный роутинг для категорий /categories/by-storeId/:id
    url: API_URL.categories(`/by-storeId/${id}`),
    method: 'GET',
  })

  return data
}

// метод на получение категории по id
const getById = async (id: string) => {
  const { data } = await axiosClassic<ICategory>({
    // серверный роутинг для категорий /categories/by-id/:id
    url: API_URL.categories(`/by-id/${id}`),
    method: 'GET',
  })

  return data
}

// метод на создание категории для магазина по его id
const create = async (data: ICategoryInput, storeId: string) => {
  const { data: createdCategory } = await axiosClassic<ICategory>({
    // серверный роутинг для категорий /categories/storeId
    url: API_URL.categories(`/${storeId}`),
    method: 'POST',
    data,
  })

  return createdCategory
}

// метод на обновление категории по его id
const update = async (id: string, data: ICategoryInput) => {
  const { data: updatedCategory } = await axiosClassic<ICategory>({
    // серверный роутинг для категорий /categories/id
    url: API_URL.categories(`/${id}`),
    method: 'PUT',
    data,
  })

  return updatedCategory
}

// метод на удаление категории по его id
const deleteCategory = async (id: string) => {
  const { data: deleteCategory } = await axiosClassic<ICategory>({
    // серверный роутинг для категорий /categories/id
    url: API_URL.categories(`/${id}`),
    method: 'DELETE',
  })

  return deleteCategory
}

export const categoryService = {
  getByStoreId,
  getById,
  create,
  update,
  deleteCategory,
}
