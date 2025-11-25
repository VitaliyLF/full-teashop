'use client'
import { useParams } from 'next/navigation'

import { useGetProducts } from '@/hooks/queries/products/useGetProducts'

interface IProductsProps {}

const Products = ({}: IProductsProps) => {
  const params = useParams<{ storeId: string }>()

  // получаем  продукты по динамическому id магазина
  const { products, isLoading } = useGetProducts()

  return (
    <div className="">
      <div className="">Products</div>
    </div>
  )
}

export default Products
