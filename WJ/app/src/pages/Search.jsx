import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import ErrorMessage from '../components/ErrorMessage'
import { mockProducts } from '../data/mockProducts'

export default function Search() {
  const [query, setQuery] = useState('')
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [showError, setShowError] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return mockProducts
    const q = query.toLowerCase()
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Search</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search products, brands..."
        onSelect={(p) => setQuery(p.name)}
      />

      <div className="flex items-center gap-2 flex-wrap">
        <Link
          to="/filters"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 min-h-[44px]"
        >
          Filters
        </Link>
        <span className="text-sm text-gray-500">Sort: Most Sustainable</span>
      </div>

      {showError ? (
        <ErrorMessage
          message="Could not load products."
          onRetry={() => setShowError(false)}
        />
      ) : showSkeleton ? (
        <LoadingSkeleton type="card" count={6} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!showError && !showSkeleton && filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 py-8">No products found.</p>
      )}
    </div>
  )
}
