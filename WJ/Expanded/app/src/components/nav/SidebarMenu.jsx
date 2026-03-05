import { Link, useLocation } from 'react-router-dom'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const AccountIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M16 3h5v5M8 3H3v5M12 8v8M9 12l3-4 3 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const menuItems = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/search', label: 'Search', Icon: SearchIcon },
  { to: '/scan', label: 'Scan', Icon: ScanIcon },
  { to: '/account', label: 'Account', Icon: AccountIcon },
  { to: '/wishlist', label: 'Saved items', Icon: HeartIcon },
  { to: '/compare', label: 'Compare', Icon: ScaleIcon },
  { to: '/filters', label: 'Filters', Icon: FilterIcon },
  { to: '/account/accessibility', label: 'Accessibility', Icon: SettingsIcon },
]

export default function SidebarMenu({ isOpen, onClose }) {
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(to + '/')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop overlay – absolute to stay inside phone frame */}
      <div
        className="absolute inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
      />
      {/* Slide-out drawer */}
      <aside
        className="absolute top-0 left-0 bottom-0 w-[min(280px,85vw)] bg-white shadow-xl z-50 flex flex-col animate-slide-in-left"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-4 pt-14 pb-4 border-b border-gray-100">
          <span className="font-bold text-lg text-gray-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Main navigation">
          {menuItems.map(({ to, label, Icon }) => {
            const active = isActive(to)
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3.5 min-h-[52px] transition-colors ${
                  active ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Icon />
                </div>
                <span className="flex-1 font-medium">{label}</span>
                <ChevronIcon />
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
