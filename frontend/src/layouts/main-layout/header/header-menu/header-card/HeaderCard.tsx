import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

interface IHeaderCardProps {}

const HeaderCard = ({}: IHeaderCardProps) => {
  return (
    <Sheet>
      {/* добавили asChild просто получается если не добавить asChild что будет кнопка в кнопке рендериться */}
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Heading className="text-xl" title="Корзина товаров" />
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default HeaderCard
