import { PropsWithChildren } from 'react'

import Footer from './footer/Footer'
import Header from './header/Header'

const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="layout flex flex-col h-full">
      <Header />
      <main className="main flex-1 mx-5 lg:mx-14">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
