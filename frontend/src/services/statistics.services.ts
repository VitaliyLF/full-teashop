import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IMainStatistics } from '@/shared/types/statistics.interface'

// метод на получение главной статистики
const getMain = async (storeId: string) => {
  const { data } = await axiosWithAuth<IMainStatistics[]>({
    url: API_URL.statistics(`/main/${storeId}`),
    method: 'GET',
  })

  return data
}

// метод на получение средней статистики
const getMiddle = async (storeId: string) => {
  const { data } = await axiosWithAuth<IMainStatistics>({
    url: API_URL.statistics(`/middle/${storeId}`),
    method: 'GET',
  })

  return data
}

export const statisticsService = {
  getMain,
  getMiddle,
}
