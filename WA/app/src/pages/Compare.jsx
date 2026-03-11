import { Link } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import SustainabilityTooltip from '../components/common/SustainabilityTooltip'
const RATING_STYLES = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-amber-100 text-amber-800',
  C: 'bg-red-100 text-red-800',
}

const RATING_ORDER = { A: 3, B: 2, C: 1 }

function getComparisonNote(product, allInCategory) {
  const rank = allInCategory.findIndex((p) => p.id === product.id) + 1
  const total = allInCategory.length
  const lowestCarbon = allInCategory.reduce((min, p) => (p.carbonFootprint < min ? p.carbonFootprint : min), Infinity)
  const highestCarbon = Math.max(...allInCategory.map((p) => p.carbonFootprint))
  const ecoPackaging = ['Cardboard', 'Paper', 'Compostable', 'Glass', 'Tin', 'Refillable', 'Minimal', 'Loose']

  const notes = []
  if (rank === 1) {
    notes.push('Most sustainable option in this category.')
  } else if (rank === total && total > 1) {
    notes.push('Least sustainable in this comparison.')
  }
  if (product.carbonFootprint === lowestCarbon && total > 1) {
    notes.push('Lowest carbon footprint.')
  } else if (product.carbonFootprint >= highestCarbon * 0.9 && total > 1) {
    notes.push('Higher carbon than others.')
  }
  if (ecoPackaging.includes(product.packagingType)) {
    notes.push('Eco-friendly packaging.')
  } else if (product.packagingType === 'Plastic') {
    notes.push('Plastic packaging has higher environmental impact.')
  }
  if (product.ethicalSourcing) {
    notes.push(`Ethical: ${product.ethicalSourcing}.`)
  }
  return notes.length > 0 ? notes.join(' ') : product.environmentalSummary
}

export default function Compare() {
  const { compareProductIds, compareCategory } = useAppState()
  const allMatched = (compareProductIds ?? [])
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter(Boolean)
  const category = compareCategory ?? allMatched[0]?.category

  if (!category) {
    return (
      <div className="py-6 space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">Compare products</h1>
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-700 mb-4">No products to compare.</p>
          <p className="text-sm text-gray-600 mb-6">
            Click Compare on a product to see all brands of that type ranked by sustainability.
          </p>
          <Link
            to="/search"
            className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px]"
          >
            Browse products
          </Link>
        </div>
      </div>
    )
  }

  const allInCategory = mockProducts
    .filter((p) => p.category === category)
    .sort((a, b) => {
      const rA = RATING_ORDER[a.sustainabilityRating] ?? 0
      const rB = RATING_ORDER[b.sustainabilityRating] ?? 0
      if (rB !== rA) return rB - rA
      return a.carbonFootprint - b.carbonFootprint
    })

  return (
    <div className="py-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Compare {category}</h1>
        <p className="text-sm text-gray-600 mt-1">All brands ranked from most to least sustainable</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 min-w-max">
          {allInCategory.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-col w-[200px] shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      {product.category}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.brand}</p>
                  <p className="text-green-600 font-bold text-sm mt-1">£{product.price.toFixed(2)}</p>
                  <SustainabilityTooltip rating={product.sustainabilityRating}>
                    <span
                      className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded ${
                        RATING_STYLES[product.sustainabilityRating] ?? 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {product.sustainabilityRating} {index === 0 ? '– Best' : ''}
                    </span>
                  </SustainabilityTooltip>
                </div>
              </Link>
              <div className="p-3 pt-0 mt-auto border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-1">
                  {product.carbonFootprint}kg CO2e · {product.packagingType}
                </p>
                <p className="text-xs text-gray-700">
                  {getComparisonNote(product, allInCategory)}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="block mt-2 text-xs text-green-600 hover:underline font-medium"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/search" className="text-sm text-green-600 hover:underline">
        ← Back to search
      </Link>
    </div>
  )
}
