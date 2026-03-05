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

const PRICE_SLIDER_MIN = 0
const PRICE_SLIDER_MAX = 20
const PRICE_STEP = 0.5

function PriceRangeSlider({ valueMin, valueMax, onChange }) {
  const minVal = valueMin ?? PRICE_SLIDER_MIN
  const maxVal = valueMax ?? PRICE_SLIDER_MAX

  const handleMinChange = (e) => {
    const v = Number(e.target.value)
    onChange(Math.min(v, maxVal), maxVal)
  }

  const handleMaxChange = (e) => {
    const v = Number(e.target.value)
    onChange(minVal, Math.max(v, minVal))
  }

  const isUnset = valueMin == null && valueMax == null
  const low = isUnset ? PRICE_SLIDER_MIN : minVal
  const high = isUnset ? PRICE_SLIDER_MAX : maxVal
  const lowPct = ((low - PRICE_SLIDER_MIN) / (PRICE_SLIDER_MAX - PRICE_SLIDER_MIN)) * 100
  const highPct = ((high - PRICE_SLIDER_MIN) / (PRICE_SLIDER_MAX - PRICE_SLIDER_MIN)) * 100

  return (
    <div className="price-range-slider">
      <div className="price-range-track">
        <div
          className="price-range-fill"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />
        <input
          type="range"
          min={PRICE_SLIDER_MIN}
          max={PRICE_SLIDER_MAX}
          step={PRICE_STEP}
          value={low}
          onChange={handleMinChange}
          className="price-range-input price-range-input-min"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={PRICE_SLIDER_MIN}
          max={PRICE_SLIDER_MAX}
          step={PRICE_STEP}
          value={high}
          onChange={handleMaxChange}
          className="price-range-input price-range-input-max"
          aria-label="Maximum price"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>£{low.toFixed(1)}</span>
        <span>£{high.toFixed(1)}</span>
      </div>
    </div>
  )
}

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

  const setPriceRange = (minVal, maxVal) => {
    const isFullRange = minVal <= PRICE_SLIDER_MIN && maxVal >= PRICE_SLIDER_MAX
    setFilters((prev) => ({
      ...prev,
      priceMin: isFullRange ? null : minVal,
      priceMax: isFullRange ? null : maxVal,
    }))
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
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-green-600 hover:underline py-1"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Sustainability</h3>
        <div className="flex flex-wrap gap-2">
          {MIN_SUSTAINABILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setMinSustainability(opt.value)}
              className={`px-2.5 py-2 rounded-lg text-sm font-medium min-h-[40px] ${
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
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Max CO2e (kg)</h3>
        <input
          type="number"
          min="0"
          step="0.1"
          value={filters.maxCarbonFootprint ?? ''}
          onChange={(e) => setMaxCarbon(e.target.value)}
          placeholder="Any"
          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm min-h-[40px]"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Price range</h3>
        <PriceRangeSlider
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          onChange={setPriceRange}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Packaging</h3>
        <div className="flex flex-wrap gap-2">
          {PACKAGING_OPTIONS.map((opt) => {
            const active = (filters.packagingType ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('packagingType', opt)}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium min-h-[40px] ${
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
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Brand</h3>
        <div className="flex flex-wrap gap-2">
          {BRAND_OPTIONS.map((opt) => {
            const active = (filters.brand ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('brand', opt)}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium min-h-[40px] ${
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
        <h3 className="text-sm font-medium text-gray-700 mb-1.5">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {NUTRITION_OPTIONS.map((opt) => {
            const active = (filters.nutritionTags ?? []).includes(opt)
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleArrayFilter('nutritionTags', opt)}
                className={`px-2.5 py-2 rounded-lg text-sm font-medium min-h-[40px] ${
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
