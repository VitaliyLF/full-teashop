'use client'

import { useGetCategory } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import ProductForm from '../components/ProductForm'

interface ICreateProductProps {}

const CreateProduct = ({}: ICreateProductProps) => {
  const { categories } = useGetCategory()
  const { colors } = useGetColors()

  return <ProductForm categories={categories || []} colors={colors || []} />
}

export default CreateProduct
