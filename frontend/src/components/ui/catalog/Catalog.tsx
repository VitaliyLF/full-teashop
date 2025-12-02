import Link from 'next/link'

import ProductCard from '../product-card/ProductCard'

import { ICatalog } from './catalog.interface'

const Catalog = ({ title, description, products, link, linkTitle }: ICatalog) => {
  return (
    <div className="wrapper">
      <div className="header md:flex md:items-center md:justify-between mb-4">
        <div className="info max-w-2xl px-4 lg:max-w-full lg:px-0">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        </div>
        {/* сслыка Узнать больше если она нужна */}
        {link && linkTitle && (
          <Link
            className="hidden text-sm font-medium text-blue-500 hover:text-blue-600/90 md:flex"
            href={link}>
            {linkTitle}
          </Link>
        )}
      </div>
      <div className="catalog flex items-center w-full">
        <div className="products mt-2 w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-10">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div>Продукты не найдены</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog
