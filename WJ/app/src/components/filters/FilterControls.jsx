import { useAppState } from '../../app/providers/AppProvider'

const MIN_SUSTAINABILITY_OPTIONS = [
  { value: 0, label: 'Any' },
  { value: 50, label: 'C (50+)' },
  { value: 70, label: 'B (70+)' },
  { value: 90, label: 'A (90+)' },
]

const PACKAGING_OPTIONS = ['Cardboard', 'Compostable', 'Glass', 'Paper', 'Refillable', 'Loose', 'Minimal', 'Tin']
const BRAND_OPTIONS = ['Earth Bean', 'EcoClean', 'Fresh Farms', 'Green Bite', 'Green Valley', 'Ocean Fresh', 'Pure Grain', 'Bee Natural', 'CleanEarth', 'EcoSmile', 'SustainBottle']
const NUTRITION_OPTIONS = ['Vegan', 'Organic', 'High Protein', 'Fair Trade', 'Gluten Free', 'Low Sugar', 'Whole Grain', 'No Added Sugar']

export default function FilterControls() {
  const { filters, setFilters } = useAppState()

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] ?? []
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
  }

  const setMinSustainability = (value) => {
    setFilters((prev) => ({ ...prev, minSustainability: Number(value) }))
  }

  const setPriceMin = (val) => {
    const n = val === '' ? null : Number(val)
    setFilters((prev) => ({ ...prev, priceMin: n }))
  }

  const setPriceMax = (val) => {
    const n = val === '' ? null : Number(val)
    setFilters((prev) => ({ ...prev, priceMax: n }))
  }

  const setMaxCarbon = (val) => {
    const n = val === '' ? null : Number(val)
    setFilters((prev) => ({ ...prev, maxCarbonFootprint: n }))
  }

  const clearFilters = () => {
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

  const hasActiveFilters =
    filters.minSustainability > 0 ||
    filters.maxCarbonFootprint != null ||
    filters.priceMin != null ||
    filters.priceMax != null ||
    (filters.packagingType?.length ?? 0) > 0 ||
    (filters.brand?.length ?? 0) > 0 ||
    (filters.nutritionTags?.length ?? 0) > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-green-600 hover:underline min-h-[44px] min-w-[44px] flex items-center"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Minimum sustainability rating</h3>
        <div className="flex flex-wrap gap-2">
          {MIN_SUSTAINABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMinSustainability(opt.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                (filters.minSustainability ?? 0) === opt.value
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Max carbon footprint (kg CO2e)</h3>
        <input
          type="number"
          min="0"
          step="0.1"
          value={filters.maxCarbonFootprint ?? ''}
          onChange={(e) => setMaxCarbon(e.target.value)}
          placeholder="Any"
          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm min-h-[44px]"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Price range</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <label className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Min £</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={filters.priceMin ?? ''}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Any"
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm min-h-[44px]"
            />
          </label>
          <label className="flex items-center gap-1">
            <span className="text-sm text-gray-600">Max £</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={filters.priceMax ?? ''}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Any"
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm min-h-[44px]"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Packaging type</h3>
        <div className="flex flex-wrap gap-2">
          {PACKAGING_OPTIONS.map((opt) => {
            const active = (filters.packagingType ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('packagingType', opt)}
                className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                  active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Brand</h3>
        <div className="flex flex-wrap gap-2">
          {BRAND_OPTIONS.map((opt) => {
            const active = (filters.brand ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('brand', opt)}
                className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                  active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Nutrition tags</h3>
        <div className="flex flex-wrap gap-2">
          {NUTRITION_OPTIONS.map((opt) => {
            const active = (filters.nutritionTags ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('nutritionTags', opt)}
                className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                  active ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
