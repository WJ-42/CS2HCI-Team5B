import { useAppState } from '../../app/providers/AppProvider'

const SORT_OPTIONS = [
  { id: 'sustainable', label: 'Most Sustainable' },
  { id: 'carbon', label: 'Lowest Carbon Footprint' },
]

export default function SortControls() {
  const { sortOption, setSortOption } = useAppState()

  return (
    <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-hide">
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setSortOption(opt.id)}
          className={`shrink-0 px-4 py-2.5 rounded-2xl text-sm font-medium min-h-[44px] transition-colors ${
            sortOption === opt.id
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
