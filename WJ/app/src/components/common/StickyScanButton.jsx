import { Link } from 'react-router-dom'

export default function StickyScanButton() {
  return (
    <Link
      to="/search"
      className="fixed right-4 bottom-20 md:bottom-6 z-30 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg flex items-center justify-center font-semibold text-sm min-w-[56px] min-h-[56px]"
      aria-label="Scan product"
    >
      Scan
    </Link>
  )
}
