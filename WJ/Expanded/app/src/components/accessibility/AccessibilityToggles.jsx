import { useAccessibility } from '../../context/AccessibilityContext'

const TOGGLES = [
  { key: 'largerText', label: 'Larger text size' },
  { key: 'highContrast', label: 'High contrast mode' },
  { key: 'largerTouchTargets', label: 'Larger touch targets' },
  { key: 'simpleNavMode', label: 'Simple navigation mode' },
  { key: 'screenReaderMode', label: 'Screen reader compatibility hints' },
]

export default function AccessibilityToggles() {
  const ctx = useAccessibility()

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm bg-white">
      {TOGGLES.map(({ key, label }, i) => (
        <label
          key={key}
          className={`flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer min-h-[52px] active:bg-gray-50 ${
            i < TOGGLES.length - 1 ? 'border-b border-gray-50' : ''
          }`}
        >
          <span className="font-medium text-gray-900">{label}</span>
          <input
            type="checkbox"
            checked={ctx[key]}
            onChange={(e) => ctx.setToggle(key, e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
        </label>
      ))}
    </div>
  )
}
