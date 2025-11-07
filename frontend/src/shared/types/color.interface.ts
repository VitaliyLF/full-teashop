// Типизация нашей сущности Color
export interface IColor {
  id: string
  createdAt: string
  name: string
  value: string
  storeId: string
}

// type на создание цвета
// с помощью Omit мы берем все и через перечисление исключаем чего быть не должно
// с помощью Pick мы берем поля name и value
export type IColorInput = Pick<IColor, 'name' | 'value'>
