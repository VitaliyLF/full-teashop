'use client'
import { useQuery } from '@tanstack/react-query'

import Catalog from '@/components/ui/catalog/Catalog'

import { productService } from '@/services/product.services'

import { IProduct } from '@/shared/types/product.interface'

import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductReviews from './ProductReviews'

interface IProductProps {
  initialProduct: IProduct
  similarProducts: IProduct[]
  id?: string
}

const Product = ({ initialProduct, similarProducts, id = '' }: IProductProps) => {
  // прикручивает тут танстак квери, но зачем ?
  // тут будут отзывы и я хочу по ключу ревалидируем данные чтобы сразу обновлялись данные в продукте когда оставят отзыв
  // без обновления странички

  const { data: product } = useQuery({
    // посколько делаем динамически изменняемый параметр
    queryKey: ['product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    // у нас не будет отправляться запроса если нет id
    // !!id переводит в булева а потом инвертирует
    enabled: !!id,
  })

  return (
    <div className="product-page mx-auto max-w-7xl">
      <div className="content space-y-7 px-4 py-10 sm:px-6 lg:px-8">
        <div className="blocks lg:grid lg:grid-cols-2 lg:items-start lg:gap-8">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
      <Catalog title="Похожие товары" products={similarProducts} />
      <ProductReviews product={product} />
    </div>
  )
}

export default Product
