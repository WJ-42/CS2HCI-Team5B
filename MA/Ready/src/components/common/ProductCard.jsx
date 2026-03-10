import { Link } from 'react-router-dom'
import ExpandableSection from './ExpandableSection'
import { useAppState } from '../../hooks/useAppState'

export default function ProductCard({ product }) {
  const { wishlistIds, comparisonIds, toggleWishlist, addToComparison, removeFromComparison } = useAppState()
  const saved = wishlistIds.includes(product.id)
  const inComparison = comparisonIds.includes(product.id)
  const { name, brand, category, price, sustainabilityRating, carbonFootprint, packagingType, nutritionTags, isBestSustainableChoice } = product

  return (
    <article
      className="product-card h-full flex flex-col bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`${name} by ${brand}, ${sustainabilityRating} sustainability rating`}
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col min-h-0">
        {/* Badge slot: always reserve space so product titles align across all cards */}
        <div className="shrink-0 min-h-[2rem] flex items-center">
          {isBestSustainableChoice && (
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
              Best sustainable choice
            </span>
          )}
        </div>

        {/* Header: name, brand, price — fixed heights for consistent card layout */}
        <div className="shrink-0 min-h-[5.5rem]">
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">{name}</h3>
          <p className="text-sm text-gray-600 truncate min-h-[1.25rem]">{brand}</p>
          <p className="text-lg font-bold text-green-600 mt-1">£{price.toFixed(2)}</p>
        </div>

        {/* Meta chips: rating, CO2e — fixed height */}
        <div className="shrink-0 mt-2 min-h-[1.75rem] flex items-center">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Rating: {sustainabilityRating}</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{carbonFootprint} kg CO2e</span>
          </div>
        </div>

        {/* Attributes: reserve consistent space — fixed height */}
        <div className="shrink-0 h-[4rem] mt-2 overflow-hidden">
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

      {/* Footer: buttons wrap on small screens so full labels stay visible */}
      <div className="shrink-0 mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
          className={`flex-1 min-w-[4.5rem] py-2 px-3 text-sm font-medium rounded-lg min-h-[44px] ${saved ? 'bg-green-100 text-green-800 border border-green-300' : 'border border-gray-300 hover:bg-gray-50'}`}
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            inComparison ? removeFromComparison(product.id) : addToComparison(product.id)
          }}
          className={`flex-1 min-w-[4.5rem] py-2 px-3 text-sm font-medium rounded-lg min-h-[44px] ${inComparison ? 'bg-green-100 text-green-800 border border-green-300' : 'border border-gray-300 hover:bg-gray-50'}`}
          aria-pressed={inComparison}
        >
          {inComparison ? 'Remove' : 'Compare'}
        </button>
      </div>
    </article>
  )
}
