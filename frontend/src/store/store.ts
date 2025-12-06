import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist'

import { cartSlice } from './cart/cart.slice'

// в браузере с localstorage можно работать только на клиенте делаем проверку
const isClient = typeof window !== 'undefined'

// закидываем сюда потом все редьюсеры из слайсов
const combinedReducers = combineReducers({
  cart: cartSlice.reducer,
})

// изначально на сервер записываем в переменную все редьюсеры
let mainReducer = combinedReducers

// если на клиенте тогда подключаем библиотеку это все нужно для работы с Localstorage
if (isClient) {
  const { persistReducer } = require('redux-persist')
  const storage = require('redux-persist/lib/storage').default

  const persistConfig = {
    key: 'shop',
    storage,
    whiteList: ['cart'],
  }

  // и все редьюсеры уже сюда прокидываем
  mainReducer = persistReducer(persistConfig, combinedReducers)
}

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //  в middleware включаем проверку сериализуемости для различных экшенов
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>
