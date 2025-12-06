import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { productService } from '@/services/product.services'

import Product from './widgets/Product'

// типизация params
type Props = {
  params: Promise<{ id: string }>
}

export const revalidate = 60

// специальная функция для оптимизации

// Что делает generateStaticParams
// generateStaticParams (App Router в Next.js) вызывается во время билда и возвращает список параметров для динамических маршрутов.
// Для каждого объекта из этого списка Next.js статически сгенерирует страницу, например для маршрута app/product/[id]/page.tsx и параметра { id: '1' } будет сгенерирован путь /product/1.
//  Это даёт преимущества по скорости и SEO (страницы уже готовы на сервере/CDN).

// кратко во время билда формирует динамические параметры для сервера чтобы уже было все готово и быстрей работало

// Когда стоит добавлять generateStaticParams
// У тебя динамический маршрут (app/product/[id]/page.tsx, app/blog/[slug]/page.tsx и т.п.) и страницы стабильны (нечасто меняются) или важны для SEO/скорости.
// Тогда предгенерация на билде даёт быструю загрузку и лучшую индексацию.
// Примеры: публичные страницы товара, посты в блоге, документация, коллекционные каталоги.

// Теперь при билде делается пререндер страниц  prerendered as static HTML
export async function generateStaticParams() {
  const products = await productService.getAll()

  // Важно: возвращаем [{ id: '1' }, { id: '2' }, ...]
  // тут генерируется при билде все продукты
  // но если их слишком много то проблема поэтому это все нужно делать только для топовых или похожих товаров
  // не нужно это делать на страницы со всеми товарами
  // Генерируем ТОЛЬКО топовые товары (лучшая SEO-стратегия)

  // Самый популярный и правильный подход.
  // генерим только 10 товаров а не все
  return products.slice(0, 10).map((product) => ({ id: product.id }))
}

// функция для получения обычных и похожие продуктов по динамическому id
const getProductWithSimilar = async (id: string) => {
  try {
    const product = await productService.getById(id)

    if (!product) {
      return notFound()
    }

    const similarProducts = await productService.getSimilar(id)

    return { product, similarProducts }
  } catch (error) {
    console.error('getProductWithSimilar error, id =', id, error)
    throw error
  }
}

// функцию для красивой сео оптимизации
// generateMetadata специальная функцию в next js для генерации ceо динамического в зависимости от параметров
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const { product } = await getProductWithSimilar(id)

  // по документации лучше указывать путь вот так к корню проекта
  const metadataBase = new URL(process.env.APP_URL || 'http://localhost:3000')

  return {
    metadataBase,
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.title,
        },
      ],
    },
  }
}

const ProductPage = async ({ params }: Props) => {
  const { id } = await params

  const { product, similarProducts } = await getProductWithSimilar(id)

  return (
    <div className="my-6">
      <Product initialProduct={product} similarProducts={similarProducts} id={id} />
    </div>
  )
}

export default ProductPage
