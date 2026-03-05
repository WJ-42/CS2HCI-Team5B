import { useState } from 'react'

export default function ExpandableSection({ title, children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-2 border-t border-gray-100 pt-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left text-sm font-medium text-green-700 hover:text-green-800 flex items-center justify-between gap-2 min-h-[44px]"
        aria-expanded={expanded}
      >
        {title}
        <span className="text-gray-500">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <div className="mt-2">{children}</div>}
    </div>
  )
}
