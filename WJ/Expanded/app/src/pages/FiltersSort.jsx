import { Link } from 'react-router-dom'
import FilterControls from '../components/filters/FilterControls'
import SortControls from '../components/filters/SortControls'

export default function FiltersSort() {
  return (
    <div className="py-4 space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort by</h2>
        <SortControls />
      </section>

      <section>
        <FilterControls />
      </section>

      <div className="flex gap-3 pt-4">
        <Link
          to="/search"
          className="flex-1 py-3.5 bg-green-600 text-white text-center font-semibold rounded-2xl hover:bg-green-700 min-h-[48px]"
        >
          Apply
        </Link>
        <Link
          to="/search"
          className="flex-1 py-3.5 bg-gray-100 text-gray-700 text-center font-semibold rounded-2xl hover:bg-gray-200 min-h-[48px]"
        >
          Clear
        </Link>
      </div>
    </div>
  )
}
