import type { ICartItem } from '@/shared/types/cart.interface'

export interface ICartInitialState {
  items: ICartItem[]
}

// с помощью Omit мы берем все и исключаем то что нужно
export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

// с помощью Pick мы берем только нужные поля
export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus'
}
