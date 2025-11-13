import Navigation from './navigation/Navigation'
import Logo from '@/layouts/main-layout/header/logo/Logo'

const Sidebar = () => {
  return (
    <div className="sidebar h-full flex flex-col bg-neutral-50 border-r overflow-y-auto pt-4 px-5 my-1">
      <Logo className="mb-6" />
      <Navigation />
    </div>
  )
}

export default Sidebar
