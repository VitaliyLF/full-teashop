import type { NextConfig } from 'next'

// Включаем все в nextConfig чтобы env норм работало
const nextConfig: NextConfig = {
  /* config options here */
  // настройка env файла
  env: {
    // указываем все наши env переменные из файла .env
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    APP_DOMAIN: process.env.APP_DOMAIN,
    SERVER_URL: process.env.SERVER_URL,
  },
  // настройка картинок
  // в next если мы используем картинки со стороннего сайта нужно указать images
  // а мы для юзеров которые авторизовались через яндекс или еще используем картинки профеля этих сервисов
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // функция rewrites она нужно чтобы подключать файлы с сервера
  // uploads/products/... вот эти картинки
  async rewrites() {
    return [
      {
        // указываем путь до папки
        source: '/uploads/:path*',
        // указываем путь до сервера
        destination: `${process.env.SERVER_URL}/uploads/:path*`,
      },
    ]
  },
}

export default nextConfig
