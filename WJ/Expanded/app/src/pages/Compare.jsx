export default function Compare() {
  return (
    <div className="py-8 flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-gray-400">
          <path d="M16 3h5v5M8 3H3v5M12 8v8M9 12l3-4 3 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-gray-600 text-center px-4">
        Compare products side by side. Coming soon.
      </p>
    </div>
  )
}
