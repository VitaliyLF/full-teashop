import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/Sheet'

import Sidebar from './Sidebar'

const MobileSidebar = () => {
  return (
    <Sheet>
      {/* кнопка по которой открывается sidebar */}
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      {/* сам sidebar нужно указывать header-title иначе ругается на доступность */}
      <SheetContent className="p-0 bg-white" side="left">
        <SheetHeader>
          <SheetTitle>
            <Sidebar />
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
