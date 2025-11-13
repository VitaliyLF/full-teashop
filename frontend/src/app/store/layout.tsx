// только корневой лояут имеет теги Html и body остальные просто принимают children
import type { PropsWithChildren } from 'react'

import StoreLayout from '@/layouts/store-layout/StoreLayout'

// попробую такую типизацию
export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <StoreLayout>{children}</StoreLayout>
}
