import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/shared/types/product.interface'

interface IAddToCartButtonProps {
  product: IProduct
}

const AddToCartButton = ({ product }: IAddToCartButtonProps) => {
  // берем методы из стора на добавления или удаления товара из корзины
  const { addToCart, removeFromCart } = useActions()
  // берем все item в корзине
  const { items } = useCart()

  // находим текущий элемент
  const currentElement = items.find((cartItem) => cartItem.product.id === product.id)

  // если текущий элемент есть тогда удаляем ил коризны иначе добавляем

  return (
    <Button
      className="w-full"
      variant="primary"
      size="lg"
      onClick={() =>
        currentElement
          ? removeFromCart({ id: currentElement.id })
          : addToCart({
              product,
              quantity: 1,
              price: product.price,
            })
      }>
      {currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  )
}

export default AddToCartButton
