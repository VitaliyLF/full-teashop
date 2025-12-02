'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import Catalog from '@/components/ui/catalog/Catalog'

import { productService } from '@/services/product.services'

import { IProduct } from '@/shared/types/product.interface'

interface IExplorerProps {
  products: IProduct[]
}

const Explorer = ({ products }: IExplorerProps) => {
  // с помощью хука получаем searchParams
  // просто подключаем его чтобы использовать методы
  // ВЕЗДЕ ГДЕ ИСПОЛЬЗУЕТСЯ хук useSearchParams этот компонент нужно обворачивать в Suspense
  const searchParams = useSearchParams()

  // из нее будем получать наш поиск
  // тут берем значение из searchTerm
  // пример ?searchTerm=Apple Apple это значение
  const searchTerm = searchParams.get('searchTerm')

  // поиск по параметрам происходит через useQuery
  const { data: searchResultsProducts } = useQuery({
    queryKey: ['product explorer', searchTerm],
    queryFn: () => productService.getAll(searchTerm),
    // начальные (предзагруженные) данные для этого запроса
    // данные о продуктах записываются в кэш запроса
    // чтобы при переходе просто на страницу каталога отображались уже все продукты
    // и при вводе в инпут не будут лететь постоянно запросы на каждую букву
    initialData: products,
  })

  return (
    <div className="my-6">
      <Catalog
        // если мы перешли через searchTerm тогда выподим title с searchTerm
        // если мы просто перешли на страницу explorer тогда будет Каталог товара
        title={searchTerm ? `Поиск по запросу "${searchTerm}"` : 'Каталог товара'}
        products={searchResultsProducts}
      />
    </div>
  )
}

export default Explorer
