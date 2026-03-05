export default function LoadingSkeleton({ type = 'card', count = 6 }) {
  if (type === 'card') {
    return (
      <div className="search-results-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse aspect-[3/4]"
            aria-hidden="true"
          >
            <div className="h-full p-3 flex flex-col">
              <div className="flex-1 bg-gray-200 rounded-lg mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }
  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" aria-hidden="true" />
        ))}
      </div>
    )
  }
  return null
}
