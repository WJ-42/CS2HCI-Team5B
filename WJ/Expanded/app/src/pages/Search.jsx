import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import ProductCard from '../components/common/ProductCard'
import FilterSheet from '../components/filters/FilterSheet'
import SortControls from '../components/filters/SortControls'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import { useFilteredProducts } from '../hooks/useFilteredProducts'

function countActiveFilters(filters) {
  let n = 0
  if ((filters.minSustainability ?? 0) > 0) n++
  if (filters.maxCarbonFootprint != null) n++
  if (filters.priceMin != null || filters.priceMax != null) n++
  if ((filters.packagingType?.length ?? 0) > 0) n++
  if ((filters.brand?.length ?? 0) > 0) n++
  if ((filters.nutritionTags?.length ?? 0) > 0) n++
  return n
}

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showSkeleton] = useState(false)
  const [showError] = useState(false)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false)
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

  const activeFilterCount = countActiveFilters(filters)

  return (
    <div className="py-4">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search products, brands..."
        onSelect={(p) => navigate(`/product/${p.id}`)}
      />

      {/* Sort + Filters row */}
      <div className="flex items-center gap-3 mt-4 mb-4">
        <SortControls />
        <button
          type="button"
          onClick={() => setFilterSheetOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl border border-gray-200 text-sm font-medium text-gray-700 shadow-sm min-h-[44px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Results */}
      {showError ? (
        <ErrorMessage message="Could not load products." onRetry={() => {}} />
      ) : showSkeleton ? (
        <LoadingSkeleton type="card" count={6} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 px-4">
          <p className="text-gray-600 mb-4">No products match your filters.</p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                minSustainability: 0,
                maxCarbonFootprint: null,
                priceMin: null,
                priceMax: null,
                packagingType: [],
                brand: [],
                nutritionTags: [],
              })
            }
            className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-2xl hover:bg-green-700 min-h-[44px]"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="search-results-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FilterSheet isOpen={filterSheetOpen} onClose={() => setFilterSheetOpen(false)} />
    </div>
  )
}
