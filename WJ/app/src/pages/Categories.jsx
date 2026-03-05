import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/common/ProductCard'
import { mockProducts, categories } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import { useFilteredProducts } from '../hooks/useFilteredProducts'

export default function Categories() {
  const { category } = useParams()
  const { filters, sortOption } = useAppState()

  const categoryProducts = category
    ? mockProducts.filter((p) => p.category === category)
    : null

  const products = useFilteredProducts({
    products: categoryProducts ?? [],
    filters,
    sortOption,
  })

  if (category && categoryProducts) {
    return (
      <div className="py-6 space-y-6">
        <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
          <Link to="/categories" className="hover:text-green-600">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category}</span>
        </nav>
        <h1 className="text-xl font-semibold text-gray-900">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 py-8">
              No products match your filters in this category.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/categories/${encodeURIComponent(cat)}`}
            className="p-6 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors min-h-[44px] flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">{cat}</span>
            <span className="text-green-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
