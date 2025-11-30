import { PropsWithChildren } from 'react'

import Footer from './footer/Footer'
import Header from './header/Header'

const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="wrapper flex flex-col min-h-full">
      <div className="layout flex-1">
        <Header />
        <main className="main mx-5 lg:mx-14">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
