'use client'

import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import { Button } from '@/components/ui/Button'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import ReviewModal from '@/components/ui/modals/ReviewModal'

import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'
import { useProfile } from '@/hooks/userProfile'

import { IProduct } from '@/shared/types/product.interface'

interface IProductReviewsProps {
  product: IProduct
}

const ProductReviews = ({ product }: IProductReviewsProps) => {
  const { user } = useProfile()

  const { deleteReview } = useDeleteReview()

  return (
    <>
      <div className="header flex justify-between items-center mt-10">
        <h1 className="text-2xl font-bold">Отзыв</h1>
        {user && (
          <ReviewModal storeId={product.storeId}>
            <Button variant="ghost">
              <Plus className="size-4" />
              Добавить отзыв
            </Button>
          </ReviewModal>
        )}
      </div>
      <div className="reviews grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {product.reviews.length ? (
          product.reviews.map((review) => (
            <div key={review.id} className="review border  rounded-lg p-4">
              <div className="header flex justify-between">
                <div className="user flex items-center gap-4 font-medium">
                  <Image
                    className="rounded-full"
                    src={review.user.picture}
                    alt={review.user.name}
                    width={40}
                    height={40}
                  />
                  {review.user.name}
                </div>
                {review.user.id === user?.id && (
                  <ConfirmModal handleClick={() => deleteReview(review.id)}>
                    <button className="delete mt-3 text-red-400 cursor-pointer">
                      <Trash className="size-4" />
                    </button>
                  </ConfirmModal>
                )}
              </div>
              <Rating
                readonly
                initialValue={review.rating}
                SVGstyle={{ display: 'inline-block' }}
                size={18}
                allowFraction
                transition
              />
              <p className="text text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))
        ) : (
          <div className="not-found mt-4">У товара нет отзывов</div>
        )}
      </div>
    </>
  )
}

export default ProductReviews
