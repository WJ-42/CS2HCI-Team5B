export default function Scan() {
  return (
    <div className="py-8 flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-gray-400">
          <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-gray-600 text-center px-4">
        Scan barcodes to find sustainable products. Coming soon.
      </p>
    </div>
  )
}
