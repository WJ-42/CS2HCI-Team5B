import { useState, useRef, useEffect } from 'react'
import { mockProducts } from '../data/mockProducts'

export default function SearchBar({ value, onChange, onSelect, placeholder = 'Search products...' }) {
  const [internalQuery, setInternalQuery] = useState('')
  const isControlled = value !== undefined
  const query = isControlled ? value : internalQuery
  const setQuery = (v) => {
    if (isControlled) onChange?.(v)
    else setInternalQuery(v)
  }
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    const q = query.toLowerCase()
    const filtered = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
    setSuggestions(filtered.slice(0, 8))
    setIsOpen(true)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (product) => {
    setQuery(product.name)
    setIsOpen(false)
    onSelect?.(product)
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none min-h-[44px]"
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-expanded={isOpen}
        aria-activedescendant={suggestions.length ? 'suggestion-0' : undefined}
      />
      {isOpen && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
        >
          {suggestions.map((product, i) => (
            <li
              key={product.id}
              id={`suggestion-${i}`}
              role="option"
              tabIndex={-1}
              className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 min-h-[44px] flex flex-col justify-center"
              onClick={() => handleSelect(product)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelect(product)
              }}
            >
              <span className="font-medium text-gray-900">{product.name}</span>
              <span className="text-sm text-gray-600">{product.brand}</span>
            </li>
          ))}
        </ul>
      )}
      {isOpen && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <p className="text-gray-600">No products found for "{query}"</p>
        </div>
      )}
    </div>
  )
}
