import { useState } from 'react'
import { Link } from 'react-router-dom'
import ExpandableSection from './ExpandableSection'

export default function ProductCard({ product }) {
  const [saved, setSaved] = useState(false)
  const { name, brand, category, price, sustainabilityRating, carbonFootprint, packagingType, nutritionTags, isBestSustainableChoice } = product

  return (
    <article
      className="product-card h-full flex flex-col bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`${name} by ${brand}, ${sustainabilityRating} sustainability rating`}
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col min-h-0">
        {/* Header: tag, name, brand, price */}
        <div className="shrink-0">
          {isBestSustainableChoice && (
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                Best sustainable choice
              </span>
            </div>
          )}
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{brand}</p>
          <p className="text-lg font-bold text-green-600 mt-1">£{price.toFixed(2)}</p>
        </div>

        {/* Meta chips: rating, CO2e */}
        <div className="shrink-0 mt-2">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Rating: {sustainabilityRating}</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{carbonFootprint} kg CO2e</span>
          </div>
        </div>

        {/* Attributes: reserve consistent space */}
        <div className="shrink-0 min-h-[4rem] mt-2">
          {nutritionTags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {nutritionTags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Spacer: pushes Sustainability details to bottom */}
        <div className="flex-1 min-h-0" aria-hidden="true" />

        {/* Sustainability details: fixed above footer */}
        <div className="shrink-0">
          <ExpandableSection title="Sustainability details">
            <p className="text-sm text-gray-700">
              Packaging: {packagingType}. Carbon footprint: {carbonFootprint} kg CO2e per unit.
              Sustainability rating {sustainabilityRating} based on sourcing, production, and transport.
            </p>
          </ExpandableSection>
        </div>
      </Link>

      {/* Footer: pinned to bottom */}
      <div className="shrink-0 mt-auto pt-4 border-t border-gray-100 flex gap-2">
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
        >
          Compare
        </button>
      </div>
    </article>
  )
}
