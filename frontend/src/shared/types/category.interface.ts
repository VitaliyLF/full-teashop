// Типизация нашей сущности Категории
export interface ICategory {
  id: string
  createdAt: string
  title: string
  description: string
  storeId: string
}

// type на создание цвета
// с помощью Omit мы берем все и через перечисление исключаем чего быть не должно
// с помощью Pick мы берем поля title и description
export type ICategoryInput = Pick<ICategory, 'title' | 'description'>
