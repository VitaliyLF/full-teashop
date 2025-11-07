import type { Metadata } from 'next'

import Home from './Home'

export const metadata: Metadata = {
  title: 'Ваш шопинг,ваше удовоствие - все в однмо месте',
}

const HomePage = () => {
  return <Home />
}

export default HomePage
