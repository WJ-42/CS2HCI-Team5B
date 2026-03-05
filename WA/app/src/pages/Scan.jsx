import { Link } from 'react-router-dom'

export default function Scan() {
  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Scan</h1>
      <p className="text-gray-700">
        This is a placeholder for the scan screen. Teammates will implement barcode scanning here.
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
