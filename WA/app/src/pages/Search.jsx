import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import ProductCard from '../components/common/ProductCard'
import FilterControls from '../components/filters/FilterControls'
import SortControls from '../components/filters/SortControls'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import { useFilteredProducts } from '../hooks/useFilteredProducts'

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showSkeleton] = useState(false)
  const [showError] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { filters, sortOption, setFilters } = useAppState()

  const searchFiltered = query.trim()
    ? mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : mockProducts

  const filteredProducts = useFilteredProducts({
    products: searchFiltered,
    filters,
    sortOption,
  })

  const resetFilters = () => {
    setFilters({
      category: null,
      minSustainability: 0,
      maxCarbonFootprint: null,
      priceMin: null,
      priceMax: null,
      packagingType: [],
      brand: [],
      nutritionTags: [],
    })
  }

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Search</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search products, brands..."
        onSelect={(p) => navigate(`/product/${p.id}`)}
      />

      <div className="search-layout">
        {/* Left: sticky filters sidebar (desktop only) */}
        <aside className="search-sidebar" aria-label="Filters">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <FilterControls />
          </div>
        </aside>

        {/* Right: results area */}
        <div className="search-results">

          {/* Mobile: collapsible filters toggle */}
          <div className="search-mobile-filters mb-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 min-h-[44px] flex items-center justify-center gap-2"
            >
              Filters
              <span className="text-gray-500">{mobileFiltersOpen ? '−' : '+'}</span>
            </button>
            {mobileFiltersOpen && (
              <div className="mt-2 border border-gray-200 rounded-xl p-4 bg-white">
                <FilterControls />
              </div>
            )}
          </div>

          {/* Sort row */}
          <div className="mb-4">
            <SortControls />
          </div>

          {/* Results */}
          {showError ? (
            <ErrorMessage
              message="Could not load products."
              onRetry={() => {}}
            />
          ) : showSkeleton ? (
            <LoadingSkeleton type="card" count={6} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-700 mb-4">No products match your filters.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 min-h-[44px]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
