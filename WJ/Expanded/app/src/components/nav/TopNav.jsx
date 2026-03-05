import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAccessibility } from '../../context/AccessibilityContext'

const ROUTE_TITLES = {
  '/search': 'Search',
  '/scan': 'Scan',
  '/account': 'Account',
  '/account/accessibility': 'Accessibility',
  '/filters': 'Filters',
  '/wishlist': 'Saved Items',
  '/compare': 'Compare',
}

function getTitle(pathname) {
  if (pathname.startsWith('/product/')) return 'Product'
  return ROUTE_TITLES[pathname]
}

function isDetailPage(pathname) {
  if (pathname === '/') return false
  if (pathname === '/search' || pathname === '/scan' || pathname === '/account') return false
  return true
}

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

export default function TopNav({ onMenuClick }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { simpleNavMode } = useAccessibility()
  const title = getTitle(location.pathname)
  const showBack = isDetailPage(location.pathname)

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shrink-0"
      role="banner"
    >
      <div className="flex items-center justify-between min-h-[52px] px-3 safe-area-pt">
        {showBack ? (
          <>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] -ml-1 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Go back"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="flex-1 text-center text-base font-semibold text-gray-900 truncate mx-2">
              {title}
            </h1>
            <button
              type="button"
              onClick={onMenuClick}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] -mr-1 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onMenuClick}
              className="flex items-center justify-center min-h-[44px] min-w-[44px] -ml-1 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 group min-h-[44px]"
              aria-label="Home"
            >
              <span
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 18 2c1 2 2 2.5 2.5 4.5A7 7 0 0 1 20 11H4a2 2 0 0 1 2-2c1 0 1.5.5 2 2s1 2 4 2" />
                </svg>
              </span>
              <span
                className={`font-bold tracking-tight ${simpleNavMode ? 'text-lg' : 'text-xl'} bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent truncate`}
              >
                {simpleNavMode ? 'Sustainability Shop' : 'Sustainable Shop'}
              </span>
            </Link>
            <div className="w-11" aria-hidden />
          </>
        )}
      </div>
    </header>
  )
}
