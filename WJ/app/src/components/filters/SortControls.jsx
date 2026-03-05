import { useAppState } from '../../app/providers/AppProvider'

const SORT_OPTIONS = [
  { id: 'sustainable', label: 'Most Sustainable' },
  { id: 'carbon', label: 'Lowest Carbon Footprint' },
]

export default function SortControls() {
  const { sortOption, setSortOption } = useAppState()

  const handleSelect = (id) => setSortOption(id)

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className="text-sm font-medium text-gray-700">Sort by</span>
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] ${
              sortOption === opt.id
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
