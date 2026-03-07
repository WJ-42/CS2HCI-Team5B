import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Scan() {
  const [useBorderedBox, setUseBorderedBox] = useState(false)
  const [scanScreenState, setScanScreenState] = useState(1) // 1: barcode view, 2: error/retry
  const [barcode, setBarcode] = useState('')
  const [barcodeError, setBarcodeError] = useState(false)
  const [codeBoxState, setCodeBoxState] = useState(1) // 1: input, 2: error/retry
  const [signalState, setSignalState] = useState(0)
  const inputRefs = useRef([])

  const cycleSignalState = () => setSignalState((prev) => (prev + 1) % 4)

  const handleBarcodeChange = (index, value) => {
    setBarcodeError(false)
    const digit = value.replace(/\D/g, '').slice(-1)
    setBarcode((prev) => {
      const next = prev.slice(0, index) + digit + prev.slice(index + 1)
      return next.slice(0, 13)
    })
    if (digit && index < 12) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 0)
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !barcode[index] && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    setBarcodeError(false)
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 13)
    setBarcode(pasted)
    const focusIndex = Math.min(pasted.length, 12)
    setTimeout(() => inputRefs.current[focusIndex]?.focus(), 0)
  }

  const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  useEffect(() => {
    if (!barcodeError) return
    const t = setTimeout(() => setBarcodeError(false), 2000)
    return () => clearTimeout(t)
  }, [barcodeError])

  const SignalIcon = ({ darkBg = false, state = 0 }) => {
    const unfilledColor = darkBg ? '#6b7280' : '#d1d5db'
    if (state === 3) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Offline" className="shrink-0 translate-x-[5px]">
          <path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    }
    const getBarColor = (i) => {
      if (state === 0) return i < 5 ? '#16a34a' : unfilledColor
      if (state === 1) return i < 3 ? '#ea580c' : unfilledColor
      if (state === 2) return i < 1 ? '#dc2626' : unfilledColor
      return unfilledColor
    }
    return (
      <svg width="36" height="26" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Signal strength" className="shrink-0">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 2 + i * 4.5
          const w = 3
          const h = 4 + i * 2.5
          return (
            <rect key={i} x={x} y={20 - h} width={w} height={h} fill={getBarColor(i)} />
          )
        })}
      </svg>
    )
  }

  const signalText = signalState === 0
    ? 'Good signal'
    : signalState === 1
      ? 'Medium signal - performance may vary'
      : signalState === 2
        ? 'Low signal - connection is unstable'
        : 'Offline - unable to connect'

  const signalBoxWidth = signalState === 0 ? 'w-[155px]' : signalState === 1 ? 'w-[320px]' : signalState === 2 ? 'w-[290px]' : 'w-[250px]'

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">
        {useBorderedBox ? 'Enter Product Code' : 'Scan Product Barcode'}
      </h1>
      <p className="text-gray-700">
        {useBorderedBox
          ? 'Manually search for product details by entering the barcode number'
          : 'Point your camera at a product barcode to look up sustainability information.'}
      </p>
      <div
        className={`relative w-[512px] h-[384px] rounded-lg flex flex-col overflow-visible ${
          useBorderedBox ? 'border-[5px] border-black bg-transparent' : 'border-[5px] border-black bg-gray-200 justify-center'
        }`}
        aria-hidden={!useBorderedBox}
      >
        <button
          type="button"
          onClick={cycleSignalState}
          className={`absolute flex flex-row items-center rounded-lg border-[5px] border-black bg-white z-10 pl-2.5 py-2 min-h-[3.5rem] ${signalState === 3 ? 'pr-[60px]' : 'pr-[50px]'} ${signalBoxWidth} -top-[5px] -right-[5px]`}
          aria-label={`Signal status: ${signalState === 0 ? 'Good' : signalState === 1 || signalState === 2 ? 'Low signal' : 'Offline'}. Click to cycle.`}
        >
          <span
            className={`text-sm text-gray-600 text-left shrink-0 whitespace-nowrap ${
              signalState === 2 ? '-ml-[5px]' : signalState === 3 ? 'ml-[15px]' : ''
            }`}
          >
            {signalText}
          </span>
          <span className={`absolute right-2.5 top-1/2 -translate-y-1/2 h-10 flex items-center justify-center ${signalState === 3 ? 'w-[50px] px-[5px]' : 'w-10'}`}>
            <SignalIcon darkBg={false} state={signalState} />
          </span>
        </button>
        {!useBorderedBox && scanScreenState === 1 && (
          <button
            type="button"
            onClick={() => setScanScreenState(2)}
            className="flex-1 flex items-center justify-center min-h-0 w-full cursor-pointer border-0 bg-transparent p-0"
            aria-label="Scan barcode (click to simulate scan)"
          >
            <svg width="175" height="175" viewBox="-22 14 184 124" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 pointer-events-none">
              {/* 4 L-shaped corners: 40 units each way, outer edges only around barcode */}
              <path d="M-19 18 L21 18 M-19 18 L-19 58" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M120 18 L160 18 M160 18 L160 58" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M-19 131 L-19 91 M-19 131 L21 131" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M120 131 L160 131 M160 91 L160 131" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" fill="none" />
              <g fill="#9ca3af" stroke="none" transform="translate(68, 50) scale(2, 1) translate(-68, -50)">
                {/* Full bars - gap created by mask that moves with scan line */}
                {/* Left guard (tall) */}
                <rect x="38" y="38" width="1" height="74" />
                <rect x="40" y="38" width="1" height="74" />
                {/* Digit 1 + left 6 (short) */}
                <rect x="43" y="38" width="2" height="64" />
                <rect x="46" y="38" width="1" height="64" />
                <rect x="48" y="38" width="2" height="64" />
                <rect x="52" y="38" width="1" height="64" />
                <rect x="54" y="38" width="2" height="64" />
                <rect x="58" y="38" width="1" height="64" />
                <rect x="60" y="38" width="3" height="64" />
                <rect x="65" y="38" width="1" height="64" />
                <rect x="67" y="38" width="2" height="64" />
                {/* Center guard (tall) */}
                <rect x="71" y="38" width="1" height="74" />
                {/* Right 6 digits (short) */}
                <rect x="74" y="38" width="2" height="64" />
                <rect x="78" y="38" width="1" height="64" />
                <rect x="80" y="38" width="2" height="64" />
                <rect x="84" y="38" width="3" height="64" />
                <rect x="89" y="38" width="1" height="64" />
                <rect x="91" y="38" width="2" height="64" />
                <rect x="95" y="38" width="1" height="64" />
                <rect x="97" y="38" width="2" height="64" />
                {/* Right guard (tall) */}
                <rect x="101" y="38" width="1" height="74" />
                <rect x="103" y="38" width="1" height="74" />
              </g>
              {/* Scan line - animates up and down */}
              <g className="barcode-scan-line">
                <line x1="-5" y1="80" x2="149" y2="80" stroke="red" strokeWidth="2" strokeLinecap="round" />
              </g>
              {/* X's at bottom of short bars: 1 before bar 1 | 6 between bars 2-3 | 6 between bar 3 and bars 4-5 */}
              <text x="1" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="23" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="31" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="39" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="47" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="55" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="63" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="86" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="94" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="102" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="110" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="118" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
              <text x="126" y="111" fill="#9ca3af" fontSize="8.75" fontFamily="monospace" textAnchor="middle">X</text>
            </svg>
          </button>
        )}
        {!useBorderedBox && scanScreenState === 2 && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full gap-6" aria-live="polite">
            <p className="text-gray-700 text-center px-4">
              Barcode not found. Please try again.
            </p>
            <button
              type="button"
              onClick={() => setScanScreenState(1)}
              className="p-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              aria-label="Retry scan"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
            </button>
          </div>
        )}
        {useBorderedBox && codeBoxState === 1 && (
          <div className="flex-1 flex flex-col items-center min-h-0" role="group" aria-label="13-digit barcode input">
            <div className="h-[66px] shrink-0 w-full" aria-hidden="true" />
            <div className="flex-1 min-h-0 w-full" />
            <p className="text-sm text-gray-600 shrink-0 -mb-[20px]">enter the 13-digit barcode number</p>
            <div className="flex-1 min-h-0 w-full" />
            <div className="flex items-center gap-0.5 shrink-0">
              {slots.map((index) => (
                <span key={index} className="contents">
                  {index === 1 && <span className="px-1.5 text-gray-500 font-mono text-lg">|</span>}
                  {index === 7 && <span className="px-1.5 text-gray-500 font-mono text-lg">|</span>}
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={barcode[index] ?? ''}
                    onChange={(e) => handleBarcodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-6 h-12 text-center text-lg font-mono border-b-2 rounded-none focus:outline-none focus:ring-0 focus:border-green-600 bg-transparent ${barcode[index] ? 'border-green-600' : 'border-gray-400'}`}
                    aria-label={`Barcode digit ${index + 1} of 13`}
                  />
                </span>
              ))}
            </div>
            <div className="flex-1 min-h-0 w-full" />
            <button
              type="button"
              onClick={() => {
                if (barcode.length !== 13) {
                  setBarcodeError(true)
                } else {
                  setBarcodeError(false)
                  setCodeBoxState(2)
                }
              }}
              className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px] shrink-0 mb-[20px]"
            >
              look up sustainability information
            </button>
            {barcodeError && (
              <p className="text-red-600 text-sm shrink-0 -mt-2 mb-[20px]" role="alert">
                please enter the 13-digit code
              </p>
            )}
            <div className="flex-1 min-h-0 w-full" />
          </div>
        )}
        {useBorderedBox && codeBoxState === 2 && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full gap-6" aria-live="polite">
            <p className="text-gray-700 text-center px-4">
              Invalid code. Please try again.
            </p>
            <button
              type="button"
              onClick={() => setCodeBoxState(1)}
              className="p-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              aria-label="Retry barcode lookup"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <p className="text-gray-700">
        {useBorderedBox
          ? 'The 13-digit code can be found underneath the barcode at the back of the packaging.'
          : 'Position the barcode within the frame. Products will open automatically when detected.'}
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
          setUseBorderedBox((prev) => !prev)
          if (useBorderedBox) {
            setScanScreenState(1)
            setCodeBoxState(1)
          }
        }}
          className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
        >
          {useBorderedBox ? 'Scan barcode' : 'Search manually instead'}
        </button>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 min-h-[44px] min-w-[44px]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
