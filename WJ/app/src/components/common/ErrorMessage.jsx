export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div
      className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
      role="alert"
    >
      <p className="text-red-800 font-medium">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 min-h-[44px]"
        >
          Retry
        </button>
      )}
    </div>
  )
}
