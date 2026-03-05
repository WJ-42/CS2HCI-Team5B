import { useState } from 'react'

const SORT_OPTIONS = [
  { id: 'sustainable', label: 'Most Sustainable' },
  { id: 'carbon', label: 'Lowest Carbon Footprint' },
]

export default function SortControls({ onChange }) {
  const [selected, setSelected] = useState('sustainable')

  const handleSelect = (id) => {
    setSelected(id)
    onChange?.(id)
  }

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Sort by</h3>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
              selected === opt.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
