import { IProduct } from '@/shared/types/product.interface'

interface IProductInfoProps {
  product: IProduct
}

const ProductInfo = ({ product }: IProductInfoProps) => {
  return (
    <div className="">
      <div className="">ProductInfo</div>
    </div>
  )
}

export default ProductInfo
