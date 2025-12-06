import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  // по документации лучше указывать путь вот так к корню проекта
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: {
    default: SITE_NAME,
    // template это через %s уже на каждой странице будет принимать сео title строку
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
}

// только корневой лояут имеет теги Html и body остальные просто принимают children
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${GeistSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
