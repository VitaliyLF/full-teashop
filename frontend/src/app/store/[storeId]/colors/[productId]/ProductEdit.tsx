'use client'

import { useQuery } from '@tanstack/react-query'

// import { AxiosError } from 'axios'

import { useGetCategories } from '@/hooks/queries/categories/useGetCategories'
import { useGetColors } from '@/hooks/queries/colors/useGetColors'

import { productService } from '@/services/product.services'

import ProductForm from '../components/ColorForm'

const ProductEdit = ({ productId }: { productId: string }) => {
  // получаю сверху динамический роутинг в компонент но можно и через хук useParams
  // const { productId } = useParams<{ productId: string }>()

  const { categories } = useGetCategories()
  const { colors } = useGetColors()

  // в isError выводится булево значение если будет ошибка то isError true
  const { data, isError, error } = useQuery({
    queryKey: ['get product'],
    queryFn: () => productService.getById(productId),
    // если это укажу то только один запрос улетит и не будет слаться много запросов повторных
    // retry: false,
  })

  // вот так мы можем выводить ошибки от аксиоса но не те которые приходят с сервера
  // axiosError там объект много полей
  // Это выводить серверные ошибки
  // const axiosError = error as AxiosError

  // if (!data) notFound()

  return (
    <>
      {data ? (
        <ProductForm product={data} categories={categories || []} colors={colors || []} />
      ) : (
        <></>
        // <div className="text-red-500">{axiosError?.message} Fallback</div>
      )}
    </>
  )
}

export default ProductEdit
