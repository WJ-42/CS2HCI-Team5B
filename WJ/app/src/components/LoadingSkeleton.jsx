export default function LoadingSkeleton({ type = 'card', count = 6 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-xl p-4 animate-pulse h-48"
            aria-hidden="true"
          >
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3" />
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />
            <div className="h-3 bg-gray-300 rounded w-full mb-1" />
            <div className="h-3 bg-gray-300 rounded w-2/3" />
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
