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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Accessibility toggles</h2>
      <div className="space-y-3">
        {TOGGLES.map(({ key, label }) => (
          <label
            key={key}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer min-h-[44px]"
          >
            <input
              type="checkbox"
              checked={ctx[key]}
              onChange={(e) => ctx.setToggle(key, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="font-medium text-gray-900">{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
