import Image from 'next/image'
import { useState } from 'react'

import { IProduct } from '@/shared/types/product.interface'

import { cn } from '@/lib/utils'

interface IProductGalleryProps {
  product: IProduct
}

const ProductGallery = ({ product }: IProductGalleryProps) => {
  // нужно для переключения картинки
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Image
        className="image rounded-lg"
        src={product.images[currentIndex]}
        alt={product.title}
        width={500}
        height={500}
      />
      <div className="gallery flex mt-6 gap-6">
        {product.images.slice(0, 4).map((image, index) => (
          <button
            className={cn(
              'item cursor-pointer duration-200 border rounded-lg overflow-hidden',
              index === currentIndex ? 'border-black' : 'border-transparent',
            )}
            key={index}
            onClick={() => setCurrentIndex(index)}>
            <Image src={image} alt={product.title} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
