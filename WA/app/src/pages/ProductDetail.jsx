import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { mockProducts } from '../data/mockProducts'
import { useAppState } from '../app/providers/AppProvider'
import SustainabilityTooltip from '../components/common/SustainabilityTooltip'
import SustainabilityDetails from '../components/common/SustainabilityDetails'
import SuggestedAlternatives from '../components/product/SuggestedAlternatives'

const RATING_STYLES = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-amber-100 text-amber-800',
  C: 'bg-red-100 text-red-800',
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const { addToCompare } = useAppState()
  const product = mockProducts.find((p) => String(p.id) === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="py-6 space-y-6">
        <p className="text-gray-700">Product not found.</p>
        <Link to="/" className="text-green-600 font-medium hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }

  const {
    name,
    brand,
    price,
    sustainabilityRating,
    carbonFootprint,
    packagingType,
    environmentalSummary,
    ingredients,
    nutritionSummary,
    ethicalSourcing,
    imageUrl,
  } = product

  const ratingStyle = RATING_STYLES[sustainabilityRating] ?? 'bg-gray-100 text-gray-800'

  return (
    <div className="py-6 space-y-6">
      <Link to="/search" className="text-sm text-green-600 hover:underline">
        ← Back to search
      </Link>

      {/* Top section */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 shrink-0">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">{product.category}</div>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-600 mt-1">{brand}</p>
          <p className="text-xl font-bold text-green-600 mt-2">£{price.toFixed(2)}</p>
          <SustainabilityTooltip rating={sustainabilityRating}>
            <span className={`inline-block mt-2 text-sm font-semibold px-3 py-1 rounded ${ratingStyle}`}>
              Sustainability: {sustainabilityRating}
            </span>
          </SustainabilityTooltip>
        </div>
      </section>

      {/* Information sections */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Product information</h2>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Ingredients</h3>
          <p className="text-sm text-gray-600 mt-1">{ingredients ?? 'Not specified'}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Nutrition summary</h3>
          <p className="text-sm text-gray-600 mt-1">{nutritionSummary ?? 'Not specified'}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Carbon footprint</h3>
          <p className="text-sm text-gray-600 mt-1">{carbonFootprint}kg CO2e per unit</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Packaging recyclability</h3>
          <p className="text-sm text-gray-600 mt-1">{packagingType} packaging. {['Cardboard', 'Paper', 'Compostable', 'Glass', 'Tin', 'Refillable', 'Minimal', 'Loose'].includes(packagingType) ? 'Widely recyclable or compostable.' : 'Check local recycling guidelines.'}</p>
        </div>

        {ethicalSourcing && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Ethical sourcing</h3>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
              {ethicalSourcing}
            </span>
          </div>
        )}
      </section>

      {/* Sustainability – visible info + expandable details */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sustainability</h2>
        <SustainabilityDetails product={product} />
      </section>

      {/* Actions */}
      <section className="flex gap-3">
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          className="flex-1 py-3 px-4 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
          aria-pressed={saved}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => {
            addToCompare(product.id, product.category)
            navigate('/compare')
          }}
          className="flex-1 py-3 px-4 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 min-h-[44px]"
        >
          Compare
        </button>
      </section>

      {/* Suggested alternatives – same category, better sustainability */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">More sustainable alternatives</h2>
        <SuggestedAlternatives currentProduct={product} allProducts={mockProducts} maxCount={3} />
      </section>
    </div>
  )
}
