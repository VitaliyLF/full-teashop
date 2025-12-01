'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { categoryService } from '@/services/category.services'

import CategoryForm from '../features/category-form/CategoryForm'

const CategoryEdit = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const { data } = useQuery({
    queryKey: ['get category'],
    queryFn: () => categoryService.getById(categoryId),
  })

  return <CategoryForm category={data} />
}

export default CategoryEdit
