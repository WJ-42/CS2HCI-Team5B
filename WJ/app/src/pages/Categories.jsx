import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { mockProducts, categories } from '../data/mockProducts'

export default function Categories() {
  const { category } = useParams()

  const products = category
    ? mockProducts.filter((p) => p.category === category)
    : null

  if (category && products) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
