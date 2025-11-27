import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Страница не найдена',
  description: 'The page you are looking for does not exist.',
}

// целая кастомная страница

// это эксперементальная штука ее нужно включить в конфиге next js
// experimental: {
// globalNotFound: true,
// },
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <h1>404 - Страница не найдена</h1>
        <p>Этой страницы не существует</p>
      </body>
    </html>
  )
}
