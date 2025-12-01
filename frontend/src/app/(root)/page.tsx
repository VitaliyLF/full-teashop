import type { Metadata } from 'next'

import { productService } from '@/services/product.services'

import Home from './Home'

export const metadata: Metadata = {
  title: 'Все в одном месте',
}

// обновления будут происходить каждые 60 секунд
// лучше всегда так ставить
// будет каждую минуту обновляться и мы будем всегда получать актуальные популярные продукты
export const revalidate = 60

// функция для получения популярных продуктов
const getMostPopularProducts = async () => {
  const data = (await productService.getMostPopular()).slice(0, 6)

  return data
}

const HomePage = async () => {
  const mostPopularProducts = await getMostPopularProducts()

  return <Home products={mostPopularProducts} />
}

export default HomePage
