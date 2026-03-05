import { Link, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const { id } = useParams()

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Product Detail</h1>
      <p className="text-gray-700">
        Product ID: <strong>{id ?? '—'}</strong>
      </p>
      <p className="text-gray-600">
        This is a placeholder. Teammates will implement the full product detail view.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
      >
        Back to Home
      </Link>
    </div>
  )
}
