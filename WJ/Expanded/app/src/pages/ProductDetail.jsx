import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import ExpandableSection from '../components/common/ExpandableSection'

const CATEGORY_COLORS = {
  'Dairy Alternatives': 'bg-amber-100',
  'Beverages': 'bg-rose-100',
  'Produce': 'bg-lime-100',
  'Household': 'bg-sky-100',
  'Frozen Foods': 'bg-violet-100',
  'Pantry': 'bg-amber-50',
  'Seafood': 'bg-cyan-100',
  'Personal Care': 'bg-pink-100',
  'Snacks': 'bg-yellow-100',
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = mockProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    )
  }

  const [saved, setSaved] = useState(false)
  const { name, brand, category, price, sustainabilityRating, carbonFootprint, packagingType, nutritionTags, isBestSustainableChoice } = product
  const bgClass = CATEGORY_COLORS[category] || 'bg-gray-100'

  return (
    <div className="pb-4">
      {/* Image */}
      <div className={`-mx-4 aspect-square ${bgClass} flex items-center justify-center`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-24 h-24 text-gray-400"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9h6v6H9z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="px-1 pt-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            {isBestSustainableChoice && (
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-green-500 text-white rounded-full mb-2">
                Best sustainable choice
              </span>
            )}
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{brand}</p>
          </div>
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className="p-2.5 rounded-full shrink-0"
            aria-pressed={saved}
          >
            {saved ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-gray-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl font-medium">
            Rating: {sustainabilityRating}
          </span>
          <span className="text-sm text-gray-500">{carbonFootprint} kg CO2e</span>
        </div>

        {nutritionTags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {nutritionTags.map((tag) => (
              <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        )}

        <ExpandableSection title="Sustainability details">
          <p className="text-sm text-gray-600 leading-relaxed">
            Packaging: {packagingType}. Carbon footprint: {carbonFootprint} kg CO2e per unit.
            Sustainability rating {sustainabilityRating} based on sourcing, production, and transport.
          </p>
        </ExpandableSection>
      </div>

      {/* Bottom actions */}
      <div className="mt-6 -mx-4 bg-white border-t border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl font-bold text-green-600">£{price.toFixed(2)}</p>
          </div>
          <button
            type="button"
            className="flex-1 py-3.5 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 min-h-[48px]"
          >
            Add to basket
          </button>
          <button
            type="button"
            className="p-3.5 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Add to compare"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M16 3h5v5M8 3H3v5M12 8v8M9 12l3-4 3 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
