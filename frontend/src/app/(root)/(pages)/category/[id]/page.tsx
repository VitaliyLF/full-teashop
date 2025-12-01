import type { Metadata } from 'next'

import Catalog from '@/components/ui/catalog/Catalog'

import { categoryService } from '@/services/category.services'
import { productService } from '@/services/product.services'

// типизация params
type Props = {
  params: Promise<{ id: string }>
}

export const revalidate = 60

// функция для получения продуктов и категорий по динамическому id
const getCategoryWithProducts = async (id: string) => {
  const products = await productService.getByCategory(id)

  const category = await categoryService.getById(id)

  return { products, category }
}

// функцию для красивой сео оптимизации
// generateMetadata специальная функцию в next js для генерации ceо динамического в зависимости от параметров
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const { category, products } = await getCategoryWithProducts(id)

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: products[0].images[0],
          width: 1000,
          height: 1000,
          alt: category.title,
        },
      ],
    },
  }
}

const CategoryPage = async ({ params }: Props) => {
  const { id } = await params

  const { category, products } = await getCategoryWithProducts(id)

  return (
    <div className="my-6">
      <Catalog title={category.title} description={category.description} products={products} />
    </div>
  )
}

export default CategoryPage
