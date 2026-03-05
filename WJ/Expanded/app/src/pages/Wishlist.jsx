export default function Wishlist() {
  return (
    <div className="py-8 flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-gray-400">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-gray-600 text-center px-4">
        Your saved items will appear here.
      </p>
    </div>
  )
}
