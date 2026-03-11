// Account page
// Allows users to set sustainability goals and view saved preferences

import { Link } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'
import { mockProducts } from '../data/mockProducts'

export default function Account() {
  const { filters, sortOption, accountPrefs, wishlistIds, setSustainabilityGoals } = useAppState()
  const goals = accountPrefs?.sustainabilityGoals ?? {}

  const toggleGoal = (key) => {
    setSustainabilityGoals((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const setMaxCarbon = (value) => {
    const n = parseFloat(value)
    if (!Number.isNaN(n)) setSustainabilityGoals((prev) => ({ ...prev, maxCarbonPerItem: n }))
  }

  // Work out how many saved items currently meet the user's sustainability goals

  const savedProducts = mockProducts.filter((p) => wishlistIds?.includes(p.id))
  const sustainableSaved = savedProducts.filter((p) => {
    const maxCarbon = goals.maxCarbonPerItem ?? 1.5
    const meetsCarbon = goals.reduceCarbon ? p.carbonFootprint <= maxCarbon : true
    const meetsOrganic = goals.preferOrganic ? p.nutritionTags?.includes('Organic') : true
    const meetsRecyclable = goals.preferRecyclable
      ? (p.recyclability ?? p.packagingType ?? '').toLowerCase().includes('recycl')
      : true
    return meetsCarbon && meetsOrganic && meetsRecyclable
  })
  const totalSaved = savedProducts.length
  const sustainableCount = sustainableSaved.length
  const sustainablePercent = totalSaved === 0 ? 0 : Math.round((sustainableCount / totalSaved) * 100)

  return (
    <div className="py-6 space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Account and settings</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account info</h2>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">Jane Doe</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">jane@example.com</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sustainability goals</h2>
        <p className="text-sm text-gray-600 mb-4">Set your preferences so we can tailor suggestions and filters.</p>
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
          <label className="flex items-center justify-between p-4 min-h-[44px] cursor-pointer hover:bg-gray-50">
            <span className="font-medium text-gray-900">Prioritise lower carbon footprint</span>
            <input
              type="checkbox"
              checked={!!goals.reduceCarbon}
              onChange={() => toggleGoal('reduceCarbon')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
          </label>
          <label className="flex items-center justify-between p-4 min-h-[44px] cursor-pointer hover:bg-gray-50">
            <span className="font-medium text-gray-900">Prefer organic options</span>
            <input
              type="checkbox"
              checked={!!goals.preferOrganic}
              onChange={() => toggleGoal('preferOrganic')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
          </label>
          <label className="flex items-center justify-between p-4 min-h-[44px] cursor-pointer hover:bg-gray-50">
            <span className="font-medium text-gray-900">Prefer recyclable packaging</span>
            <input
              type="checkbox"
              checked={!!goals.preferRecyclable}
              onChange={() => toggleGoal('preferRecyclable')}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
          </label>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-medium text-gray-900">Max carbon per item (kg CO2e)</span>
              <span className="text-green-600 font-medium">{goals.maxCarbonPerItem ?? 1.5} kg</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={goals.maxCarbonPerItem ?? 1.5}
              onChange={(e) => setMaxCarbon(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Progress toward your goals</h3>
              <p className="text-xs text-gray-600 mb-2">
                {totalSaved === 0
                  ? 'Save some products to start tracking how often they match your goals.'
                  : `${sustainableCount} of ${totalSaved} saved items currently match your goals.`}
              </p>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${sustainablePercent}%` }}
                  aria-hidden="true"
                />
              </div>
              {totalSaved > 0 && (
                <p className="mt-1 text-xs text-gray-500">{sustainablePercent}% of your saved items meet your goals.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved preferences</h2>
        <p className="text-sm text-gray-600 mb-4">Your current search and filter settings.</p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Default sort</p>
            <p className="font-medium text-gray-900 capitalize">{sortOption?.replace(/-/g, ' ') ?? 'Sustainable first'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price range</p>
            <p className="font-medium text-gray-900">
              {filters.priceMin != null || filters.priceMax != null
                ? `£${filters.priceMin ?? '—'} – £${filters.priceMax ?? '—'}`
                : 'Any'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Max carbon footprint</p>
            <p className="font-medium text-gray-900">
              {filters.maxCarbonFootprint != null ? `${filters.maxCarbonFootprint} kg CO2e` : 'Any'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Packaging types</p>
            <p className="font-medium text-gray-900">
              {filters.packagingType?.length > 0 ? filters.packagingType.join(', ') : 'Any'}
            </p>
          </div>
          <Link
            to="/filters"
            className="inline-block mt-2 px-4 py-2 border border-green-600 text-green-700 font-medium rounded-xl hover:bg-green-50 min-h-[44px]"
          >
            Edit filters
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-2">
          <Link
            to="/account/accessibility"
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 min-h-[44px]"
          >
            <span className="font-medium text-gray-900">Accessibility settings</span>
            <span className="text-gray-500">→</span>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your activity</h2>
        <div className="space-y-2">
          <Link
            to="/wishlist"
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 min-h-[44px]"
          >
            <span className="font-medium text-gray-900">Saved items</span>
            <span className="text-gray-500">→</span>
          </Link>
          <Link
            to="/compare"
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 min-h-[44px]"
          >
            <span className="font-medium text-gray-900">Comparison tool</span>
            <span className="text-gray-500">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
