import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import Settings from './Settings'

export const metadata: Metadata = {
  title: 'Настройки магазина',
  ...NO_INDEX_PAGE,
}

const SettingsPage = () => {
  return <Settings />
}

export default SettingsPage
