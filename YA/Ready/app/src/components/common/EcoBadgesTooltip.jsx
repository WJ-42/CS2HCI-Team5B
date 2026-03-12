import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const BULLET_POINTS = [
  'This product is sustainable.',
  'This product has a low carbon footprint.',
  'The packaging is recyclable.',
  'This product is eco friendly.',
]

const FOOTER_TEXT = 'These icons are used across our website to authenticate the validity of the environmental impact of products on our platform. They help you make informed choices about the sustainability of the items you purchase.'

export default function EcoBadgesTooltip() {
  const [visible, setVisible] = useState(false)
  const [triggerBy, setTriggerBy] = useState(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const timeoutRef = useRef(null)
  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)

  const show = (source) => {
    setTriggerBy(source)
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipHeight = 260
      const showAbove = rect.top > tooltipHeight + 16
      setPos({
        top: showAbove ? rect.top - tooltipHeight - 8 : rect.bottom + 8,
        left: Math.max(12, Math.min(rect.left, window.innerWidth - 336)),
      })
    }
    setVisible(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const hide = (source, delay = 0) => {
    if (source !== triggerBy) return
    if (delay) {
      timeoutRef.current = setTimeout(() => setVisible(false), delay)
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setVisible(false)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setVisible(false)
      }
    }
    if (visible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [visible])

  return (
    <span ref={wrapperRef} className="relative inline-flex items-center">
      <span
        ref={triggerRef}
        onMouseEnter={() => show('hover')}
        onMouseLeave={() => hide('hover', 150)}
        onFocus={() => show('focus')}
        onBlur={() => hide('focus')}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          if (!visible) show('click')
          else setVisible(false)
          setTriggerBy('click')
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={visible}
        aria-label="Eco badges information"
        className="cursor-help focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 rounded inline-flex shrink-0 text-[11px] text-gray-600 ml-2"
      >
        ⓘ
      </span>
      {visible &&
        createPortal(
          <div
            className="fixed z-[9999] w-80 max-w-[calc(100vw-2rem)] p-4 bg-gray-900 text-white text-sm rounded-lg shadow-xl border border-gray-700"
            style={{ top: pos.top, left: pos.left }}
            role="tooltip"
            onMouseEnter={() => show('hover')}
            onMouseLeave={() => hide('hover', 150)}
          >
            <h4 className="font-semibold mb-3 text-base">Eco badges</h4>
            <ul className="list-disc list-inside mb-3 space-y-1.5 text-gray-100 text-sm">
              {BULLET_POINTS.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <p className="text-gray-400 text-xs">{FOOTER_TEXT}</p>
          </div>,
          document.body
        )}
    </span>
  )
}
