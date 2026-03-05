import { useState } from 'react'

export default function OfflineBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className="bg-amber-100 border-b border-amber-200 px-4 py-2 flex items-center justify-between gap-4"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm text-amber-900">
        Offline or low signal – some features may be limited. Data may not be up to date.
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-amber-900 font-medium hover:underline min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Dismiss offline message"
      >
        Dismiss
      </button>
    </div>
  )
}
