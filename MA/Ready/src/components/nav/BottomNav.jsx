import { Link, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const location = useLocation()

  const baseClass =
    'flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-lg min-h-[44px] min-w-[44px] text-sm font-medium transition-colors'
  const activeClass = 'bg-green-100 text-green-800'
  const inactiveClass = 'text-gray-600 hover:bg-gray-100'

  const items = [
    { to: '/scan', label: 'Scan' },
    { to: '/search', label: 'Search' },
    { to: '/', label: 'Home' },
  ]

  const isActive = (to, label) => {
    if (label === 'Home') return location.pathname === '/'
    if (label === 'Search') return location.pathname === '/search'
    if (label === 'Scan') return location.pathname === '/scan'
    return false
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg safe-area-pb"
      aria-label="Mobile bottom navigation"
    >
      <div className="max-w-4xl mx-auto px-2 py-2 flex items-center justify-around">
        {items.map(({ to, label }) => (
          <Link
            key={label}
            to={to}
            className={`${baseClass} ${isActive(to, label) ? activeClass : inactiveClass}`}
            aria-current={isActive(to, label) ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
