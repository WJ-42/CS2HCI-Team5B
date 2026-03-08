import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const SCORE_EXPLANATIONS = {
  A: 'Low environmental impact. Best choice for climate and resources.',
  B: 'Moderate impact. Decent choice with some room for improvement.',
  C: 'Higher impact. Consider more sustainable alternatives when possible.',
}

const TOOLTIP_CONTENT = {
  what: 'The sustainability score (A, B, or C) shows how environmentally friendly a product is. A = best, C = needs improvement. It helps you compare products at a glance.',
  factors: 'Three factors influence the score: (1) Carbon footprint – emissions from production, transport and packaging; (2) Packaging – recyclability, use of recycled materials, and minimising waste; (3) Sourcing – ethical practices, certifications (e.g. Fair Trade, organic), and supply chain transparency.',
  calculated: 'Scores are calculated by combining carbon footprint data (kg CO2e), packaging type, and sourcing credentials. Products with lower carbon, eco-friendly packaging (e.g. cardboard, compostable), and ethical certifications score higher.',
}

export default function SustainabilityTooltip({ rating, children }) {
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
      const tooltipHeight = 220
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
    <span ref={wrapperRef} className="relative inline-block">
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
        className="cursor-help focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 rounded inline-flex items-center gap-1"
      >
        {children}
        <span className="text-[11px] text-gray-600 inline-flex shrink-0" aria-hidden>ⓘ</span>
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
          <h4 className="font-semibold mb-2 text-base">Sustainability score: {rating}</h4>
          <p className="mb-2 text-gray-100">{SCORE_EXPLANATIONS[rating] ?? `Score ${rating}`}</p>
          <p className="mb-2 text-gray-300 text-xs">{TOOLTIP_CONTENT.what}</p>
          <p className="mb-2 text-gray-300 text-xs font-medium">What affects the score?</p>
          <p className="mb-2 text-gray-400 text-xs">{TOOLTIP_CONTENT.factors}</p>
          <p className="text-gray-400 text-xs font-medium">How is it calculated?</p>
          <p className="text-gray-400 text-xs">{TOOLTIP_CONTENT.calculated}</p>
        </div>,
          document.body
        )}
    </span>
  )
}
