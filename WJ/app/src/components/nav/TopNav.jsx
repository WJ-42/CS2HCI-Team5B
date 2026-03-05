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
    { to: '/categories', label: 'Categories' },
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
          className={`font-semibold text-green-600 hover:text-green-700 ${simpleNavMode ? 'text-lg' : ''}`}
          aria-label="Home"
        >
          {simpleNavMode ? 'Sustainability Shop' : 'Sustainable Shop'}
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
