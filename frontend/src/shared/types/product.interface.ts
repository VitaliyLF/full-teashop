import { ICategory } from './category.interface'
import { IColor } from './color.interface'
import { IReview } from './review.interface'
import { IStore } from './store.interface'

export interface IProduct {
  id: string
  title: string
  description: string
  price: number
  images: string[]
  category: ICategory
  reviews: IReview[]
  color: IColor
  // можно еще так брать значения чисто его из другого интерфейса, можно просто string указать
  storeId: IStore['id']
}

// Omit удаляет указанные типы и мы расширяемся от IProduct с нужными полями
export interface IProductInput
  extends Omit<IProduct, 'id' | 'reviews' | 'storeId' | 'category' | 'color'> {
  categoryId: string
  colorId: string
}
