import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IStore, IStoreCreate, IStoreUpdate } from '@/shared/types/store.interface'

// Все взаимодействия с store могут выполнять только авторизованные пользователи

// метод на получение магазина по id
const getById = async (storeId: string) => {
  const { data } = await axiosWithAuth<IStore>({
    // серверный роутинг для магазина /stores/by-id/:id
    url: API_URL.stores(`/by-id/${storeId}`),
    method: 'GET',
  })

  return data
}

// метод на создание магазина
const create = async (data: IStoreCreate) => {
  const { data: createdStore } = await axiosWithAuth<IStore>({
    // серверный роутинг для магазина /stores
    url: API_URL.stores(''),
    method: 'POST',
    data,
  })

  return createdStore
}

// метод на обновление магазина по его id
const update = async (storeId: string, data: IStoreUpdate) => {
  const { data: updatedStore } = await axiosWithAuth<IStore>({
    // серверный роутинг для магазина /stores/:id
    url: API_URL.stores(`/${storeId}`),
    method: 'PUT',
    data,
  })

  return updatedStore
}

// метод на удаление магазина по id
const deleteStore = async (storeId: string) => {
  const { data: deleteStore } = await axiosWithAuth<IStore>({
    // серверный роутинг для магазина /stores/id
    url: API_URL.stores(`/${storeId}`),
    method: 'DELETE',
  })

  return deleteStore
}

export const storeService = {
  getById,
  create,
  update,
  deleteStore,
}
