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
    <div className="product-page">
      <div className="content">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <Catalog title="Похожие товары" products={similarProducts} />
      <ProductReviews product={product} />
    </div>
  )
}

export default Product
