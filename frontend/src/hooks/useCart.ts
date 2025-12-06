import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
  // берем из стейта наши items
  const items = useTypedSelector((state) => state.cart.items)

  // подсчитываем итоговую сумму корзины
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return { items, total }
}
