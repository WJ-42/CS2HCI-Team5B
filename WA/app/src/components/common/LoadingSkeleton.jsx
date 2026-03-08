export default function LoadingSkeleton({ type = 'card', count = 6 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse flex flex-col"
            aria-hidden="true"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="p-4 flex-1 flex flex-col">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
              <div className="h-5 bg-gray-200 rounded w-1/4 mt-2" />
              <div className="h-6 mt-3 flex gap-1">
                <div className="h-5 bg-gray-200 rounded w-8" />
                <div className="h-5 bg-gray-200 rounded w-16" />
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mt-3" />
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
