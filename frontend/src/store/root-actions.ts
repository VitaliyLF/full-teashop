import { cartSlice } from './cart/cart.slice'

// подключаем все экшенс из слайсов
// если буду еще слайсы тут подключаем его экшены
export const rootActions = {
  ...cartSlice.actions,
}
