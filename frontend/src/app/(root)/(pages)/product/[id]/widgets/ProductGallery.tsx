import { IProduct } from '@/shared/types/product.interface'

interface IProductGalleryProps {
  product: IProduct
}

const ProductGallery = ({ product }: IProductGalleryProps) => {
  return (
    <div className="">
      <div className="">ProductGallery</div>
    </div>
  )
}

export default ProductGallery
