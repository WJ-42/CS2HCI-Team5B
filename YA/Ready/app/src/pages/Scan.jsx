import { Link } from 'react-router-dom'

export default function Scan() {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Scan Product Barcode</h1>
      <p className="text-gray-700">
        Point your camera at a product barcode to look up sustainability information.
      </p>
      <div className="w-4/5 aspect-[3/4] max-h-[320px] bg-black rounded-lg" aria-hidden="true" />
      <p className="text-gray-700">
        Position the barcode within the frame. Products will open automatically when detected.
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
