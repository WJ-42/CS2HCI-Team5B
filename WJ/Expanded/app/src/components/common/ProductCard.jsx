import { useState } from 'react'
import { Link } from 'react-router-dom'

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

function ProductImage({ category }) {
  const bgClass = CATEGORY_COLORS[category] || 'bg-gray-100'
  return (
    <div className={`${bgClass} rounded-xl flex items-center justify-center aspect-square`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-10 h-10 text-gray-400"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 9h6v6H9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function ProductCard({ product, variant = 'default' }) {
  const [saved, setSaved] = useState(false)
  const { name, brand, price, sustainabilityRating, carbonFootprint, category, isBestSustainableChoice } = product

  const compact = variant === 'compact'

  if (compact) {
    return (
      <Link
        to={`/product/${product.id}`}
        className="block h-full"
        aria-label={`${name} by ${brand}, £${price.toFixed(2)}`}
      >
        <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform">
          <div className="relative">
            <ProductImage category={category} />
            {isBestSustainableChoice && (
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[10px] font-semibold bg-green-500 text-white rounded-full">
                Best
              </span>
            )}
          </div>
          <div className="p-2 flex-1 flex flex-col min-h-0">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight">{name}</h3>
            <p className="text-xs text-gray-500 truncate mt-0.5">{brand}</p>
            <div className="mt-auto pt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-green-600">£{price.toFixed(2)}</span>
              <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {sustainabilityRating}
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <article
      className="product-card h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm"
      aria-label={`${name} by ${brand}, ${sustainabilityRating} sustainability rating`}
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col min-h-0">
        <div className="relative">
          <ProductImage category={category} />
          {isBestSustainableChoice && (
            <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-lg">
              Best choice
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setSaved(!saved)
            }}
            className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
            aria-pressed={saved}
          >
            {saved ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-600">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        <div className="p-3 flex-1 flex flex-col min-h-0">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">{name}</h3>
          <p className="text-xs text-gray-500 truncate mt-0.5">{brand}</p>
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{sustainabilityRating}</span>
            <span className="text-xs text-gray-500">{carbonFootprint} kg CO2e</span>
          </div>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-base font-bold text-green-600">£{price.toFixed(2)}</span>
            <button
              type="button"
              onClick={(e) => e.preventDefault()}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Add to compare"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M16 3h5v5M8 3H3v5M12 8v8M9 12l3-4 3 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </article>
  )
}
