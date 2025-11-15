import Navigation from './navigation/Navigation'
import Logo from '@/layouts/main-layout/header/logo/Logo'

const Sidebar = () => {
  return (
    <div className="sidebar h-full flex flex-col bg-white p-0 lg:bg-neutral-50 lg:border-r overflow-y-auto lg:pt-4 lg:px-5 my-1">
      <Logo className="mb-6" />
      <Navigation />
    </div>
  )
}

export default Sidebar
