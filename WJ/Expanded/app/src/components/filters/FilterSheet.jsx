import { useEffect } from 'react'
import FilterControls from './FilterControls'

export default function FilterSheet({ isOpen, onClose, onApply }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleApply = () => {
    onApply?.()
    onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] max-h-[85vh] flex flex-col transition-transform duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h2 id="filter-sheet-title" className="text-lg font-semibold text-gray-900">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 rounded-full hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterControls />
        </div>
        <div className="flex gap-3 px-4 py-4 border-t border-gray-100 safe-area-pb">
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3.5 bg-green-600 text-white font-semibold rounded-2xl hover:bg-green-700 transition-colors min-h-[48px]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-colors min-h-[48px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
