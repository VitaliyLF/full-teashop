import HeaderMenu from './header-menu/HeaderMenu'
import Logo from './logo/Logo'
import SearchInput from './search-input/SearchInput'

const Header = () => {
  return (
    <header className="header p-5 gap-4 h-full flex items-center bg-white border-b">
      <Logo />
      <div className="search ml-auto hidden w-[40%] lg:block">
        <SearchInput />
      </div>
      <HeaderMenu />
    </header>
  )
}

export default Header
