// Home page sustainability progress section
// Displays weekly sustainability impact such as CO2 saved and number of sustainable picks

import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import ProductCard from '../components/common/ProductCard'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../hooks/useAppState'

const SUSTAINABILITY_TIPS = [
  'Choose products with recyclable or compostable packaging when possible.',
  'Look for local brands to reduce transport emissions.',
  'Prefer products with certifications like Fair Trade or organic.',
  'Compare carbon footprints before buying, small choices add up.',
]

// Baseline kg CO2e per item assumed if user chose a less sustainable option
const CO2_BASELINE_KG = 2

export default function Home() {
  const navigate = useNavigate()
  const { wishlistIds, accountPrefs } = useAppState()
  const goals = accountPrefs?.sustainabilityGoals ?? {}

  const savedProducts = mockProducts.filter((p) => wishlistIds?.includes(p.id))
  // Work out which saved products match the user's sustainability goals
  const sustainableSaved = savedProducts.filter((p) => {
    const maxCarbon = goals.maxCarbonPerItem ?? 1.5
    const meetsCarbon = goals.reduceCarbon ? p.carbonFootprint <= maxCarbon : true
    const meetsOrganic = goals.preferOrganic ? p.nutritionTags?.includes('Organic') : true
    const meetsRecyclable = goals.preferRecyclable
      ? (p.recyclability ?? p.packagingType ?? '').toLowerCase().includes('recycl')
      : true
    return meetsCarbon && meetsOrganic && meetsRecyclable
  })
  // Estimate CO2 saved by comparing each sustainable product to a baseline item
  const co2SavedKg = sustainableSaved.reduce(
    (sum, p) => sum + Math.max(0, CO2_BASELINE_KG - p.carbonFootprint),
    0
  )
  const sustainablePicks = sustainableSaved.length

  const featured = mockProducts.filter((p) => p.isBestSustainableChoice).slice(0, 6)
  if (featured.length < 6) {
    featured.push(...mockProducts.filter((p) => !featured.includes(p)).slice(0, 6 - featured.length))
  }

  return (
    <div className="py-6 space-y-8">
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

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your impact</h2>
        <div className="bg-white border border-green-200 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-2xl font-bold text-green-600">{co2SavedKg.toFixed(1)} kg CO2</p>
            <p className="text-sm text-gray-600">Estimated CO2 saved from your sustainable saved items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{sustainablePicks}</p>
            <p className="text-sm text-gray-600">Sustainable picks in your saved items</p>
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
  )
}
