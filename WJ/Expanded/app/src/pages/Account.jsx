import { Link } from 'react-router-dom'

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-500">
    <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-500">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-500">
    <path d="M16 3h5v5M8 3H3v5M12 8v8M9 12l3-4 3 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ListItem({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3.5 bg-white border-b border-gray-50 last:border-b-0 min-h-[52px] active:bg-gray-50"
    >
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
        <Icon />
      </div>
      <span className="flex-1 font-medium text-gray-900">{label}</span>
      <ChevronIcon />
    </Link>
  )
}

export default function Account() {
  return (
    <div className="py-4">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6 px-1">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-white">JD</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Jane Doe</h2>
          <p className="text-sm text-gray-500">jane@example.com</p>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-2xl overflow-hidden shadow-sm mb-4">
        <div className="bg-gray-50 px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
        </div>
        <ListItem to="/account/accessibility" icon={SettingsIcon} label="Accessibility" />
      </div>

      {/* Activity */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your activity</h3>
        </div>
        <ListItem to="/wishlist" icon={HeartIcon} label="Saved items" />
        <ListItem to="/compare" icon={ScaleIcon} label="Comparison tool" />
      </div>
    </div>
  )
}
