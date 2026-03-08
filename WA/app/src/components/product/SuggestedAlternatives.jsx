import { Link } from 'react-router-dom'
import SustainabilityTooltip from '../common/SustainabilityTooltip'

const RATING_STYLES = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-amber-100 text-amber-800',
  C: 'bg-red-100 text-red-800',
}

const RATING_ORDER = { A: 3, B: 2, C: 1 }

export default function SuggestedAlternatives({ currentProduct, allProducts, maxCount = 3 }) {
  const currentRating = RATING_ORDER[currentProduct.sustainabilityRating] ?? 0
  const sameCategory = currentProduct.category
  const better = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === sameCategory &&
        (RATING_ORDER[p.sustainabilityRating] ?? 0) > currentRating
    )
    .slice(0, maxCount)

  if (better.length === 0) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-green-50 border-green-100">
        <p className="text-sm text-gray-700">
          You&apos;re viewing one of the most sustainable options in the {currentProduct.category} category.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white" aria-label="More sustainable alternatives">
      <p className="text-sm text-gray-600 mb-3">
        Switch to a greener choice in the same category. Click to view details.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {better.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block p-3 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50/50 transition-colors group"
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  {product.category}
                </div>
              )}
            </div>
            <p className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-green-700">{product.name}</p>
            <p className="text-green-600 font-bold text-sm mt-0.5">£{product.price.toFixed(2)}</p>
            <SustainabilityTooltip rating={product.sustainabilityRating}>
              <span
                className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded ${RATING_STYLES[product.sustainabilityRating] ?? 'bg-gray-100 text-gray-800'}`}
              >
                {product.sustainabilityRating}
              </span>
            </SustainabilityTooltip>
          </Link>
        ))}
      </div>
    </div>
  )
}
