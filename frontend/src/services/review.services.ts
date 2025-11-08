import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IReview, IReviewInput } from '@/shared/types/review.interface'

// метод на получение отзыва по id магазину
const getByStoreId = async (id: string) => {
  const { data } = await axiosWithAuth<IReview[]>({
    // серверный роутинг для отзыва /reviews/by-storeId/:id
    url: API_URL.reviews(`/by-storeId/${id}`),
    method: 'GET',
  })

  return data
}

// метод на создание отзыва для продукта в магазине
const create = async (data: IReviewInput, productId: string, storeId: string) => {
  const { data: createdReview } = await axiosWithAuth<IReview>({
    // серверный роутинг для отзыва /reviews/productId/storeId
    url: API_URL.reviews(`/${productId}/${storeId}`),
    method: 'POST',
    data,
  })

  return createdReview
}

// метод на удаление отзыва по его id
const deleteReview = async (id: string) => {
  const { data: deleteReview } = await axiosWithAuth<IReview>({
    // серверный роутинг для отзыва /reviews/id
    url: API_URL.reviews(`/${id}`),
    method: 'DELETE',
  })

  return deleteReview
}

export const productService = {
  getByStoreId,
  create,
  deleteReview,
}
