import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Dashboard from './components/Dashboard'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  ...NO_INDEX_PAGE,
}

const DashboardPage = () => {
  return <Dashboard />
}

export default DashboardPage
