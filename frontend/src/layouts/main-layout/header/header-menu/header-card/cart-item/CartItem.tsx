import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { ICartItem } from '@/shared/types/cart.interface'

import { formatPrice } from '@/utils/string/format-price'

import CartActions from './CartActions'

interface ICartItemProps {
  item: ICartItem
}

const CartItem = ({ item }: ICartItemProps) => {
  return (
    <div className="item flex items-center mb-5">
      <Link
        className="image relative h-28 w-28 rounded-md overflow-hidden"
        href={PUBLIC_URL.product(item.product.id)}>
        <Image
          className="object-cover"
          src={item.product.images[0]}
          alt={item.product.title}
          fill
        />
      </Link>
      <div className="right ml-6">
        <h2 className="font-medium line-clamp-1">{item.product.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.product.price)}</p>
        <CartActions item={item} />
      </div>
    </div>
  )
}

export default CartItem
