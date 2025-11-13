import type { PropsWithChildren } from 'react'

import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const StoreLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="wrapper flex flex-col w-full">
      <div className="layout">
        <div className="sidebar hidden lg:flex h-full w-64 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <div className="header h-[70px] lg:pl-64 fixed inset-y-0 w-full z-49">
          <Header />
        </div>
        <div className="main lg:pl-64 py-[70px] bg-white">{children}</div>
      </div>
    </div>
  )
}

export default StoreLayout
