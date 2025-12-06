import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/userProfile'

import { formatPrice } from '@/utils/string/format-price'

import CartItem from './cart-item/CartItem'
import { useCheckout } from './cart-item/useCheckout'

interface IHeaderCardProps {}

const HeaderCard = ({}: IHeaderCardProps) => {
  // для закрытия компонента корзины
  const [open, setOpen] = useState(false)

  // получаем метод
  const { push } = useRouter()
  // получаем платеж и загрузку
  const { createPayment, isLoadingCreate } = useCheckout()
  // получаем юзера
  const { user } = useProfile()

  // получаем items в корзине и их итоговую сумму
  const { items, total } = useCart()

  const handleClick = () => {
    // если есть юзер тогда создаем платеж иначе кидаем на авторизацию страницу
    user ? createPayment() : push(PUBLIC_URL.auth())
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* добавили asChild просто получается если не добавить asChild что будет кнопка в кнопке рендериться */}
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Heading className="text-xl" title="Корзина товаров" />
            <div className="mt-4 items flex flex-col w-full flex-1">
              {items.length ? (
                items.map((item) => <CartItem item={item} key={item.id} />)
              ) : (
                <div className="not-found text-sm text-muted-foreground">Корзина пуста!</div>
              )}
            </div>
            {items.length ? (
              <>
                <div className="total text-lg font-medium">Итог к оплате: {formatPrice(total)}</div>
                <Button
                  className="w-full"
                  onClick={handleClick}
                  variant="primary"
                  disabled={isLoadingCreate}>
                  Перейти к оплате
                </Button>
              </>
            ) : null}
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default HeaderCard
