import { axiosClassic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IProduct, IProductInput } from '@/shared/types/product.interface'

// метод на получение всех продуктов
// принимает query параметры это для поиска по продукту
const getAll = async (searchTerm?: string | null) => {
  const { data } = await axiosClassic<IProduct[]>({
    // серверный роутинг для продуктов /products
    url: API_URL.products(''),
    method: 'GET',
    // если они есть тогда их кладем иначе пустой объект
    params: searchTerm ? { searchTerm } : {},
  })

  return data || []
}

// метод на получение продуктов по id магазину
const getByStoreId = async (storeId: string) => {
  const { data } = await axiosWithAuth<IProduct[]>({
    // серверный роутинг для прдуктов /products/by-storeId/:id
    url: API_URL.products(`/by-storeId/${storeId}`),
    method: 'GET',
  })

  return data || []
}

// метод на получение продукта по id
const getById = async (productId: string) => {
  const { data } = await axiosClassic<IProduct>({
    // серверный роутинг для продукта /products/by-id/id
    url: API_URL.products(`/by-id/${productId}`),
    method: 'GET',
  })

  return data
}

// метод на получение продукта по категории
const getByCategory = async (categoryId: string) => {
  const { data } = await axiosClassic<IProduct[]>({
    // серверный роутинг для продукта /products/by-category/categoryId
    url: API_URL.products(`/by-category/${categoryId}`),
    method: 'GET',
  })

  return data
}

// метод на получение самых популярных продуктов
const getMostPopular = async () => {
  const { data } = await axiosClassic<IProduct[]>({
    // серверный роутинг для продукта /products/most-popular
    url: API_URL.products('/most-popular'),
    method: 'GET',
  })

  return data
}

// метод на получение похожих продуктов
const getSimilar = async (id: string) => {
  const { data } = await axiosClassic<IProduct[]>({
    // серверный роутинг для продукта /products/similar/:id
    url: API_URL.products(`/similar/${id}`),
    method: 'GET',
  })

  return data
}

// метод на создание продукта для магазина
const create = async (storeId: string, data: IProductInput) => {
  const { data: createdProduct } = await axiosWithAuth<IProduct[]>({
    // серверный роутинг для магазина /products/:storeId
    url: API_URL.products(`/${storeId}`),
    method: 'POST',
    data,
  })

  return createdProduct
}

// метод на обновление продукта по его id
const update = async (productId: string, data: IProductInput) => {
  const { data: updatedProduct } = await axiosWithAuth<IProduct[]>({
    // серверный роутинг для продукта /products/id
    url: API_URL.products(`/${productId}`),
    method: 'PUT',
    data,
  })

  return updatedProduct
}

// метод на удаление продукта по его id
const deleteProduct = async (productId: string) => {
  const { data: deleteProduct } = await axiosWithAuth<IProduct>({
    // серверный роутинг для продукта store/:storeId/products/:productId
    url: API_URL.products(`/${productId}`),
    method: 'DELETE',
  })

  return deleteProduct
}

export const productService = {
  getAll,
  getByStoreId,
  getById,
  getByCategory,
  getMostPopular,
  getSimilar,
  create,
  update,
  deleteProduct,
}
