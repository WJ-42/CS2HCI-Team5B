// Compare page
// Shows selected products side-by-side and highlights the most sustainable option



import { Link } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../hooks/useAppState'

const ratingOrder = { A: 3, B: 2, C: 1 }

// Choose the best sustainable option using a predefined flag,
// otherwise fall back to highest sustainability rating and lowest carbon footprint
function getBestChoice(products) {
  if (products.length === 0) return null
  const withBest = products.find((p) => p.isBestSustainableChoice)
  if (withBest) return withBest.id
  const sorted = [...products].sort((a, b) => {
    const ra = ratingOrder[a.sustainabilityRating] ?? 0
    const rb = ratingOrder[b.sustainabilityRating] ?? 0
    if (rb !== ra) return rb - ra
    return a.carbonFootprint - b.carbonFootprint
  })
  return sorted[0]?.id ?? null
}

export default function Compare() {
  const { comparisonIds, removeFromComparison, clearComparison } = useAppState()
  const products = mockProducts.filter((p) => comparisonIds.includes(p.id))
  const bestId = getBestChoice(products)

  if (products.length === 0) {
    return (
      <div className="py-6 space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">Comparison tool</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-700 mb-4">Add products from Search or your Saved items to compare them side by side.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/search"
              className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px]"
            >
              Search products
            </Link>
            <Link
              to="/wishlist"
              className="inline-block px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 min-h-[44px]"
            >
              Saved items
            </Link>
          </div>
        </div>
        <Link to="/" className="inline-block text-gray-600 hover:text-gray-900">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-900">Compare products</h1>
        <button
          type="button"
          onClick={clearComparison}
          className="text-sm font-medium text-gray-600 hover:text-red-600 min-h-[44px] px-3"
        >
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-4 min-w-max pb-4" style={{ minWidth: 'min(100%, 280px * ' + products.length + ')' }}>
          {products.map((p) => {
            const isBest = p.id === bestId
            return (
              <div
                key={p.id}
                className={`flex-shrink-0 w-[260px] rounded-xl border-2 p-4 bg-white ${isBest ? 'border-green-500 shadow-md ring-2 ring-green-200' : 'border-gray-200'}`}
              >
                {isBest && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                      Best sustainable choice
                    </span>
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 line-clamp-2">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.brand}</p>
                <button
                  type="button"
                  onClick={() => removeFromComparison(p.id)}
                  className="mt-2 text-xs text-gray-500 hover:text-red-600"
                  aria-label={`Remove ${p.name} from comparison`}
                >
                  Remove from comparison
                </button>

                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Price</dt>
                    <dd className="font-medium text-green-600">£{p.price.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Sustainability score</dt>
                    <dd className="font-medium">{(p.sustainabilityRating ?? '—')}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Carbon footprint</dt>
                    <dd className="font-medium">{p.carbonFootprint} kg CO2e</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Recyclability</dt>
                    <dd className="font-medium">{p.recyclability ?? p.packagingType ?? '—'}</dd>
                  </div>
                </dl>
              </div>
            )
          })}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-3 font-semibold text-gray-900 w-40">Criteria</th>
              {products.map((p) => (
                <th key={p.id} className="p-3 font-medium text-gray-900 max-w-[180px]">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="p-3 text-gray-600">Price</td>
              {products.map((p) => (
                <td key={p.id} className="p-3 font-medium text-green-600">£{p.price.toFixed(2)}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-3 text-gray-600">Sustainability score</td>
              {products.map((p) => (
                <td key={p.id} className="p-3">{p.sustainabilityRating}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-3 text-gray-600">Carbon footprint</td>
              {products.map((p) => {
                const bestCarbon = Math.min(...products.map((x) => x.carbonFootprint))
                const isBestCarbon = p.carbonFootprint === bestCarbon
                return (
                  <td key={p.id} className={`p-3 ${isBestCarbon ? 'font-medium text-green-700' : ''}`}>
                    {p.carbonFootprint} kg CO2e {isBestCarbon && '✓'}
                  </td>
                )
              })}
            </tr>
            <tr>
              <td className="p-3 text-gray-600">Recyclability</td>
              {products.map((p) => (
                <td key={p.id} className="p-3">{p.recyclability ?? p.packagingType ?? '—'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/search"
          className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px]"
        >
          Add more to compare
        </Link>
        <Link to="/" className="inline-block px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 min-h-[44px]">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
