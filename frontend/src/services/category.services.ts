import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

// метод на получение категории по id магазину
const getByStoreId = async (storeId: string) => {
  const { data } = await axiosWithAuth<ICategory[]>({
    // серверный роутинг для категорий store/:storeId/categories/by-storeId/:id
    url: API_URL.categories(`/by-storeId/${storeId}`),
    method: 'GET',
  })

  return data
}

// метод на получение категории по id
const getById = async (id: string) => {
  const { data } = await axiosWithAuth<ICategory>({
    // серверный роутинг для категорий store/:storeId/categories/by-id/:id
    url: API_URL.categories(`/by-id/${id}`),
    method: 'GET',
  })

  return data
}

// метод на создание категории для магазина по его id
const create = async (storeId: string, data: ICategoryInput) => {
  const { data: createdCategory } = await axiosWithAuth<ICategory>({
    // серверный роутинг для категорий store/:storeId/categories/storeId
    url: API_URL.categories(`/${storeId}`),
    method: 'POST',
    data,
  })

  return createdCategory
}

// метод на обновление категории по его id
const update = async (categoryId: string, data: ICategoryInput) => {
  const { data: updatedCategory } = await axiosWithAuth<ICategory>({
    // серверный роутинг для категорий store/:storeId/categories/id
    url: API_URL.categories(`/${categoryId}`),
    method: 'PUT',
    data,
  })

  return updatedCategory
}

// метод на удаление категории по его id
const deleteCategory = async (categoryId: string) => {
  const { data: deleteCategory } = await axiosWithAuth<ICategory>({
    // серверный роутинг для категорий store/:storeId/categories/id
    url: API_URL.categories(`/${categoryId}`),
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
