// Типизация магазина

// Для самого магазина
export interface IStore {
  id: string
  title: string
  description: string
}

// type на создание магазина
// Возьми тип IStore и оставь только поле title.
export type IStoreCreate = Pick<IStore, 'title'>

// Тип на изменение магазина
// тут делаем Omit поскольку нам нужно все кроме id т.е брать все и исключать только id
export type IStoreUpdate = Omit<IStore, 'id'>
