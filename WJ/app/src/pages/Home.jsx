import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { mockProducts } from '../data/mockProducts'

export default function Home() {
  const featured = mockProducts.slice(0, 6)

  return (
    <div className="py-6 space-y-8">
      <section className="text-center py-8 px-4 bg-green-50 rounded-2xl border border-green-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Shop sustainably
        </h1>
        <p className="text-gray-700 max-w-md mx-auto">
          Find eco-friendly products and make better choices for the planet.
        </p>
        <Link
          to="/search"
          className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
        >
          Start searching
        </Link>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Personal sustainability goals</h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: '45%' }}
                  role="progressbar"
                  aria-valuenow={45}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">45% of weekly sustainability target</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured products</h2>
          <Link
            to="/categories"
            className="text-green-600 font-medium hover:underline min-h-[44px] min-w-[44px] flex items-center"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
