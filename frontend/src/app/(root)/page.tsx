import type { Metadata } from 'next'

import Home from './Home'

export const metadata: Metadata = {
  title: 'Все в одном месте',
}

const HomePage = () => {
  return <Home />
}

export default HomePage
