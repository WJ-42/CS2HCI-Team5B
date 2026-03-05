import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import ProductCard from '../components/common/ProductCard'
import { mockProducts } from '../data/mockProducts'

const SUSTAINABILITY_TIPS = [
  'Choose recyclable or compostable packaging.',
  'Look for local brands.',
  'Prefer Fair Trade or organic.',
  'Compare carbon footprints.',
]

const MOCKED_CO2_SAVED_KG = 2.4
const MOCKED_SUSTAINABLE_PICKS_THIS_WEEK = 12

export default function Home() {
  const navigate = useNavigate()
  const featured = mockProducts.filter((p) => p.isBestSustainableChoice).slice(0, 6)
  if (featured.length < 6) {
    featured.push(...mockProducts.filter((p) => !featured.includes(p)).slice(0, 6 - featured.length))
  }

  return (
    <div className="pb-4">
      {/* Hero: full-width search */}
      <section className="-mx-4 px-4 pt-4 pb-6 bg-gradient-to-b from-green-50 to-transparent">
        <div className="mb-2">
          <h1 className="text-xl font-bold text-gray-900">Shop sustainably</h1>
          <p className="text-sm text-gray-600 mt-0.5">Find eco-friendly products</p>
        </div>
        <SearchBar
          placeholder="Search products, brands..."
          onSelect={(p) => navigate(`/product/${p.id}`)}
        />
      </section>

      {/* Impact widget: visual card */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Your impact this week</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm overflow-hidden">
          <div className="flex gap-4">
            <div className="flex-1 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-green-600">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{MOCKED_CO2_SAVED_KG} kg CO2</p>
                <p className="text-xs text-gray-500">saved</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-green-600">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{MOCKED_SUSTAINABLE_PICKS_THIS_WEEK}</p>
                <p className="text-xs text-gray-500">sustainable picks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: horizontal carousel */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Featured products</h2>
          <Link to="/search" className="text-sm text-green-600 font-medium">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
            {featured.map((product) => (
              <div key={product.id} className="w-[160px] shrink-0">
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips: horizontal pills */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Tips</h2>
        <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 pb-2" style={{ width: 'max-content' }}>
            {SUSTAINABILITY_TIPS.map((tip, i) => (
              <div
                key={i}
                className="shrink-0 px-4 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-[260px]"
              >
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
