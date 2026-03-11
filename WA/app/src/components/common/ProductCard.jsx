import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppState } from '../../app/providers/AppProvider'
import SustainabilityTooltip from './SustainabilityTooltip'
import SustainabilityDetails from './SustainabilityDetails'

const RATING_STYLES = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-amber-100 text-amber-800',
  C: 'bg-red-100 text-red-800',
}

function PackagingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0 text-gray-600"
      aria-hidden
    >
      <path d="M7 2h10l4 4v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6l4-4z" />
      <path d="M12 11v6M9 14h6" />
    </svg>
  )
}

function RecycleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0 text-green-600"
      aria-hidden
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export default function ProductCard({ product }) {
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  const { addToCompare } = useAppState()
  const {
    name,
    brand,
    price,
    sustainabilityRating,
    carbonFootprint,
    packagingType,
    environmentalSummary,
    isBestSustainableChoice,
  } = product

  const imageUrl = product.imageUrl
  const ratingStyle = RATING_STYLES[sustainabilityRating] ?? 'bg-gray-100 text-gray-800'
  const ecoFriendlyPackaging = ['Cardboard', 'Paper', 'Compostable', 'Loose', 'Minimal', 'Refillable', 'Glass', 'Tin'].includes(packagingType)
  const fallbackSummary = `${packagingType} packaging, ${carbonFootprint}kg CO2e.`
  const summary = environmentalSummary ?? fallbackSummary

  return (
    <article
      className="product-card h-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      aria-label={`${name} by ${brand}, ${sustainabilityRating} sustainability rating`}
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col min-h-0">
        {/* Product image */}
        <div className="shrink-0 w-full aspect-square bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 text-sm">
              {product.category}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 min-h-0">
          {/* Badge slot: Best sustainable choice */}
          <div className="shrink-0 min-h-[2rem] flex items-center">
            {isBestSustainableChoice && (
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                Best sustainable choice
              </span>
            )}
          </div>

          {/* Header: name, brand, price */}
          <div className="shrink-0 min-h-[5.5rem]">
            <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] leading-tight">{name}</h3>
            <p className="text-sm text-gray-600 truncate min-h-[1.25rem]">{brand}</p>
            <p className="text-lg font-bold text-green-600 mt-1">£{price.toFixed(2)}</p>
          </div>

          {/* Meta chips: rating (traffic light), carbon, packaging icon */}
          <div className="shrink-0 mt-2 min-h-[1.75rem] flex flex-wrap items-center gap-1.5">
            <SustainabilityTooltip rating={sustainabilityRating}>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${ratingStyle}`}>
                {sustainabilityRating}
              </span>
            </SustainabilityTooltip>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
              {carbonFootprint}kg CO2e
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600" title={`Packaging: ${packagingType}`}>
              {ecoFriendlyPackaging ? <RecycleIcon /> : <PackagingIcon />}
              <span className="truncate max-w-[4rem]">{packagingType}</span>
            </span>
          </div>

          {/* Environmental summary */}
          <p className="shrink-0 mt-2 text-sm text-gray-600 line-clamp-1 min-h-[1.25rem]">
            {summary}
          </p>

          {/* Spacer */}
          <div className="flex-1 min-h-0" aria-hidden="true" />

          {/* Expandable: more sustainability details */}
          <div className="shrink-0">
            <SustainabilityDetails product={product} variant="compact" />
          </div>
        </div>
      </Link>

      {/* Footer: Save and Compare */}
      <div className="shrink-0 p-4 pt-0 border-t border-gray-100 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setSaved(!saved)
          }}
          className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            addToCompare(product.id, product.category)
            navigate('/compare')
          }}
          className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
        >
          Compare
        </button>
      </div>
    </article>
  )
}
