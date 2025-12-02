import { Button } from '@/components/ui/Button'

import { IProduct } from '@/shared/types/product.interface'

interface IAddToCartButtonProps {
  product: IProduct
}

const AddToCartButton = ({ product }: IAddToCartButtonProps) => {
  return (
    <Button className="w-full" variant="primary" size="lg">
      Добавить в корзину
    </Button>
  )
}

export default AddToCartButton
