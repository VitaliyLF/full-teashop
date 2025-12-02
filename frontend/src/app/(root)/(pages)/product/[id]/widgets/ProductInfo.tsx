import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { IProduct } from '@/shared/types/product.interface'

import { formatPrice } from '@/utils/string/format-price'
import { getWordWithEnding } from '@/utils/string/get-world-with-ending'

import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'

interface IProductInfoProps {
  product: IProduct
}

const ProductInfo = ({ product }: IProductInfoProps) => {
  // проходимся по попалям и суммируем рейтинг 5+7 / на длину массива получаем среднее и округляем
  const rating =
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length,
    ) || 0

  return (
    <div className="product-info mt-10 space-y-5 sm:mt-16 lg:mt-0">
      <h1 className="title text-3xl font-bold">{product.title}</h1>
      <span className="price text-2xl">{formatPrice(product.price)}</span>
      <hr className="my-4" />
      <p className="description text-muted-foreground tex-sm">{product.description}</p>
      <hr className="my-4" />
      <div className="label flex items-center gap-4">
        <h2 className="font-semibold">Цвет:</h2>
        <div
          className="color size-6 rounded-full border border-gray-600"
          style={{ backgroundColor: product.color.value }}></div>
      </div>
      <div className="label flex items-center gap-4">
        <h2 className="font-semibold">Категория:</h2>
        <Link className="text-sm" href={PUBLIC_URL.category(product.category.id)}>
          {product.category.title}
        </Link>
      </div>
      <div className="label flex items-center gap-4">
        <h2 className="font-semibold">Средний рейтинг товара:</h2>
        <div className="text-sm">
          ⭐ ⭐ {rating.toFixed(1)} | {getWordWithEnding(product.reviews.length)}
        </div>
      </div>
      <div className="actions flex items-start gap-2">
        <AddToCartButton product={product} />
        <FavoriteButton product={product} />
      </div>
    </div>
  )
}

export default ProductInfo
