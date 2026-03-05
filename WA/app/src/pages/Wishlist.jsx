import { Link } from 'react-router-dom'

export default function Wishlist() {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Saved items</h1>
      <p className="text-gray-700">
        This is a placeholder for the wishlist / saved items screen. Teammates will implement it here.
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
