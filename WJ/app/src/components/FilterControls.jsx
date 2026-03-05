import { useState } from 'react'

const FILTER_OPTIONS = {
  sustainability: ['A', 'B', 'C'],
  price: ['Under £5', '£5–£10', '£10+'],
  packaging: ['Cardboard', 'Compostable', 'Glass', 'Paper', 'Refillable'],
  brand: ['Earth Bean', 'EcoClean', 'Fresh Farms', 'Green Bite', 'Green Valley', 'Ocean Fresh', 'Pure Grain'],
  nutrition: ['Vegan', 'Organic', 'High Protein', 'Fair Trade', 'Gluten Free'],
}

export default function FilterControls({ onChange }) {
  const [filters, setFilters] = useState({})

  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const groupFilters = prev[group] || []
      const next = groupFilters.includes(value)
        ? groupFilters.filter((v) => v !== value)
        : [...groupFilters, value]
      const nextFilters = { ...prev }
      if (next.length) nextFilters[group] = next
      else delete nextFilters[group]
      onChange?.(nextFilters)
      return nextFilters
    })
  }

  const clearFilters = () => {
    setFilters({})
    onChange?.({})
  }

  const hasActiveFilters = Object.keys(filters).some((k) => filters[k]?.length)

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
      {Object.entries(FILTER_OPTIONS).map(([group, options]) => (
        <div key={group}>
          <h3 className="text-sm font-medium text-gray-700 capitalize mb-2">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
              const active = (filters[group] || []).includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleFilter(group, opt)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
                    active
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
