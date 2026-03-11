import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import ProductCard from '../components/common/ProductCard'
import FilterControls from '../components/filters/FilterControls'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import { useFilteredProducts } from '../hooks/useFilteredProducts'

const SUSTAINABILITY_TIPS = [
  'Choose products with recyclable or compostable packaging when possible.',
  'Look for local brands to reduce transport emissions.',
  'Prefer products with certifications like Fair Trade or organic.',
  'Compare carbon footprints before buying, small choices add up.',
]

const MOCKED_CO2_SAVED_KG = 2.4
const MOCKED_SUSTAINABLE_PICKS_THIS_WEEK = 12

export default function Home() {
  const navigate = useNavigate()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { filters, sortOption } = useAppState()

  const filteredProducts = useFilteredProducts({
    products: mockProducts,
    filters,
    sortOption,
  })

  const featured = filteredProducts.filter((p) => p.isBestSustainableChoice).slice(0, 6)
  if (featured.length < 6) {
    featured.push(...filteredProducts.filter((p) => !featured.includes(p)).slice(0, 6 - featured.length))
  }

  return (
    <div className="py-6 space-y-6">
      <section className="text-center py-8 px-4 bg-green-50 rounded-2xl border border-green-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Shop sustainably
        </h1>
        <p className="text-gray-700 max-w-md mx-auto mb-4">
          Find eco-friendly products and make better choices for the planet.
        </p>
        <div className="max-w-md mx-auto">
          <SearchBar
            placeholder="Search products, brands..."
            onSelect={(p) => navigate(`/product/${p.id}`)}
          />
        </div>
      </section>

      <div className="search-layout">
        {/* Left: sticky filters sidebar (desktop only) */}
        <aside className="search-sidebar" aria-label="Filters">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <FilterControls />
          </div>
        </aside>

        {/* Right: main content */}
        <div className="search-results space-y-8">
          {/* Mobile: collapsible filters toggle */}
          <div className="search-mobile-filters">
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

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your impact this week</h2>
            <div className="bg-white border border-green-200 rounded-xl p-6 space-y-4">
              <div>
                <p className="text-2xl font-bold text-green-600">{MOCKED_CO2_SAVED_KG.toFixed(1)} kg CO2</p>
                <p className="text-sm text-gray-600">Estimated CO2 saved from sustainable picks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{MOCKED_SUSTAINABLE_PICKS_THIS_WEEK}</p>
                <p className="text-sm text-gray-600">Sustainable picks this week</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Featured products</h2>
              <Link
                to="/search"
                className="text-green-600 font-medium hover:underline min-h-[44px] min-w-[44px] flex items-center"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sustainability tips</h2>
            <ul className="space-y-3">
              {SUSTAINABILITY_TIPS.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-green-600 font-medium shrink-0">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
