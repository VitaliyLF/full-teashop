import { cartSlice } from './cart/cart.slice'

// подключаем все экшенс из слайсов
export const rootActions = {
  ...cartSlice.actions,
}
