import { useState } from 'react'

export default function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left text-sm font-medium text-green-600 flex items-center justify-between gap-2 min-h-[44px]"
        aria-expanded={expanded}
      >
        {title}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded && <div className="mt-3">{children}</div>}
    </div>
  )
}
