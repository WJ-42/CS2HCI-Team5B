import { Link } from 'react-router-dom'
import FilterControls from '../components/filters/FilterControls'
import SortControls from '../components/filters/SortControls'

export default function FiltersSort() {
  return (
    <div className="py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Filters and sorting</h1>
        <Link
          to="/search"
          className="text-green-600 font-medium hover:underline min-h-[44px] min-w-[44px] flex items-center"
        >
          Back to search
        </Link>
      </div>

      <section>
        <SortControls />
      </section>

      <section>
        <FilterControls />
      </section>

      <div className="flex gap-4">
        <Link
          to="/search"
          className="flex-1 py-3 bg-green-600 text-white text-center font-medium rounded-xl hover:bg-green-700 min-h-[44px]"
        >
          Apply
        </Link>
        <Link
          to="/search"
          className="flex-1 py-3 bg-gray-100 text-gray-700 text-center font-medium rounded-xl hover:bg-gray-200 min-h-[44px]"
        >
          Clear
        </Link>
      </div>
    </div>
  )
}
