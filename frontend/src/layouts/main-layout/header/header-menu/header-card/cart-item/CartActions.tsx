import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/shared/types/cart.interface'

interface ICartActionsProps {
  item: ICartItem
}

const CartActions = ({ item }: ICartActionsProps) => {
  // чтобы изменять кол-во
  const { changeQuantity } = useActions()

  const { items } = useCart()
  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity

  return (
    <div className="actions flex items-center mt-1">
      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
        variant="ghost"
        size="icon"
        disabled={quantity === 1}>
        <Minus className="size-4" />
      </Button>

      <input className="w-10 text-center text-sm" disabled readOnly value={quantity} />

      <Button
        className="size-7"
        onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
        variant="ghost"
        size="icon">
        <Plus className="size-4" />
      </Button>
    </div>
  )
}

export default CartActions
