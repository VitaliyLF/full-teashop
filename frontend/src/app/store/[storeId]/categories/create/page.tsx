import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import CategoryForm from '../features/category-form/CategoryForm'

export const metadata: Metadata = {
  title: 'Создание Категории',
  ...NO_INDEX_PAGE,
}

const CreateCategoryPage = () => {
  return <CategoryForm />
}

export default CreateCategoryPage
