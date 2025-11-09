// Серверный конфиг api

// это url нашего сервера
export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
  // специальная функция которая принимает url и если он есть тогда его вставляем
  root: (url = '') => `${url ? url : ''}`,
  // описываем роутинг
  // все эти Url это все с бекенда
  auth: (url = '') => API_URL.root(`/auth${url}`),
  users: (url = '') => API_URL.root(`/users${url}`),
  stores: (url = '') => API_URL.root(`/stores${url}`),
  products: (url = '') => API_URL.root(`/products${url}`),
  categories: (url = '') => API_URL.root(`/categories${url}`),
  colors: (url = '') => API_URL.root(`/colors${url}`),
  reviews: (url = '') => API_URL.root(`/reviews${url}`),
  orders: (url = '') => API_URL.root(`/orders${url}`),
  statistics: (url = '') => API_URL.root(`/statistics${url}`),
  files: (url = '') => API_URL.root(`/files${url}`),
}
