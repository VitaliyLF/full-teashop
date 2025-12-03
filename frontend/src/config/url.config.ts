// Клиентский конфиг url

// Это url нашего сайта
export const APP_URL = process.env.APP_URL as string

// Эти Url будут доступны всем публичные
// это самые корневые страницы наши
export const PUBLIC_URL = {
  root: (url = '') => `${url ? url : ''}`,

  // описываем роутинг публичных страниц
  home: () => PUBLIC_URL.root('/'),
  auth: () => PUBLIC_URL.root('/auth'),
  // это наша страница с товарами каталог всех товаров
  // поскольку тут будет поиск он будет принимать query
  // там фильтры будут или еще что то
  explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),

  // динамические страницы
  product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
  category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
}

// Это url Для юзера
// это страница dashboard и все выходящие от нее страницы
export const DASHBOARD_URL = {
  root: (url = '') => `/dashboard${url ? url : ''}`,

  // описываем роутинг публичных страниц

  home: () => DASHBOARD_URL.root('/'),
  // на главной странице дашборда будут выводиться наши избранные заказы
  // можно выводить настройки профиля если хочеться
  favorites: () => DASHBOARD_URL.root('/favorites'),
}

// это url Для работы с магазином
// это страница store и все выходящие от нее страницы
export const STORE_URL = {
  root: (url = '') => `/store${url ? url : ''}`,

  // получаем динамический магазин на главной странице магазина
  // каждый метод получаем storeId поскольку каждый юзер может создать магазин нам нужен id магазина
  home: (storeId = '') => STORE_URL.root(`/${storeId}`),
  // страница где выводяться все продукты магазина
  products: (storeId = '') => STORE_URL.root(`/${storeId}/products`),
  // страница с созданием продукта каждый пользователь может создать продукт для своего магазина
  productsCreate: (storeId = '') => STORE_URL.root(`/${storeId}/products/create`),
  // тут принимает id магазина и id продукта чтобы изменить продукт
  productsEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/products/${id}`),

  // Все тоже самое с категориями пользователи могут их создавать и изменять для продуктов
  categories: (storeId = '') => STORE_URL.root(`/${storeId}/categories`),
  categoriesCreate: (storeId = '') => STORE_URL.root(`/${storeId}/categories/create`),
  categoriesEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/categories/${id}`),

  // Все тоже самое с цвета пользователи могут их создавать и изменять для продуктов
  colors: (storeId = '') => STORE_URL.root(`/${storeId}/colors`),
  colorsCreate: (storeId = '') => STORE_URL.root(`/${storeId}/colors/create`),
  colorsEdit: (storeId = '', id = '') => STORE_URL.root(`/${storeId}/colors/${id}`),

  // отзывы пользователь может только читать у нас нет создания и редактирования
  reviews: (storeId = '') => STORE_URL.root(`/${storeId}/reviews`),

  // страница с настройками магазина
  settings: (storeId = '') => STORE_URL.root(`/${storeId}/settings`),
}
