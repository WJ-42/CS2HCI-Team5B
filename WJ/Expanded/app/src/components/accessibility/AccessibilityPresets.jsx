import { useAccessibility } from '../../context/AccessibilityContext'

const PRESETS = [
  { id: 'vision', label: 'Vision needs', description: 'Larger text, high contrast, screen reader hints' },
  { id: 'motor', label: 'Motor needs', description: 'Larger touch targets, simple navigation' },
  { id: 'cognitive', label: 'Cognitive needs', description: 'Larger text, simple navigation, larger touch targets' },
]

export default function AccessibilityPresets() {
  const { applyPreset, resetPresets } = useAccessibility()

  return (
    <div className="space-y-2">
      {PRESETS.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => applyPreset(preset.id)}
          className="w-full text-left px-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-green-50 hover:border-green-100 transition-colors min-h-[52px]"
        >
          <span className="font-medium text-gray-900 block">{preset.label}</span>
          <span className="text-sm text-gray-500">{preset.description}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={resetPresets}
        className="w-full px-4 py-3 bg-gray-100 rounded-2xl font-medium text-gray-700 min-h-[48px] active:bg-gray-200"
      >
        Reset to default
      </button>
    </div>
  )
}
