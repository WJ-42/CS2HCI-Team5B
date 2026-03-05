import { Link, useLocation } from 'react-router-dom'
import { useAccessibility } from '../../context/AccessibilityContext'

export default function TopNav() {
  const location = useLocation()
  const { simpleNavMode } = useAccessibility()

  const baseLinkClass =
    'px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center'
  const activeClass = 'bg-green-100 text-green-800'
  const inactiveClass = 'text-gray-700 hover:bg-gray-100'

  const navItems = [
    { to: '/search', label: 'Search' },
    { to: '/scan', label: 'Scan' },
    { to: '/account', label: 'Account' },
  ]

  return (
    <header
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span
            className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow"
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
            className={`font-bold tracking-tight ${simpleNavMode ? 'text-lg' : 'text-xl'} bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-800 transition-colors`}
          >
            {simpleNavMode ? 'Sustainability Shop' : 'Sustainable Shop'}
          </span>
        </Link>
        <div className="flex items-center gap-1" role="navigation">
          {navItems.map(({ to, label }) => {
            const isActive = location.pathname === to || (to === '/scan' && location.pathname === '/search')
            return (
              <Link
                key={to}
                to={to}
                className={`${baseLinkClass} ${isActive ? activeClass : inactiveClass}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
