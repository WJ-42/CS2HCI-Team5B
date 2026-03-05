import { Link, useLocation } from 'react-router-dom'

const HomeIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2} className="w-6 h-6">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScanIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const AccountIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2} className="w-6 h-6">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const items = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/search', label: 'Search', Icon: SearchIcon },
  { to: '/scan', label: 'Scan', Icon: ScanIcon },
  { to: '/account', label: 'Account', Icon: AccountIcon },
]

export default function BottomNav() {
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(to + '/')
  }

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-100 safe-area-pb"
      aria-label="Bottom tab navigation"
    >
      <div className="flex items-center justify-around h-[64px] px-2">
        {items.map(({ to, label, Icon }) => {
          const active = isActive(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-0 py-2 rounded-xl min-h-[44px] transition-colors ${
                active ? 'text-green-600' : 'text-gray-500'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon active={active} />
              <span className="text-xs font-medium truncate max-w-full">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
