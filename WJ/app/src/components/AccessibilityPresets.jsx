import { useAccessibility } from '../context/AccessibilityContext'

const PRESETS = [
  { id: 'vision', label: 'Vision needs', description: 'Larger text, high contrast, screen reader hints' },
  { id: 'motor', label: 'Motor needs', description: 'Larger touch targets, simple navigation' },
  { id: 'cognitive', label: 'Cognitive needs', description: 'Larger text, simple navigation, larger touch targets' },
]

export default function AccessibilityPresets() {
  const { applyPreset, resetPresets } = useAccessibility()

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Accessibility presets</h2>
      <p className="text-sm text-gray-600">
        Apply a preset to quickly adjust settings for common needs.
      </p>
      <div className="space-y-3">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset.id)}
            className="w-full text-left p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors min-h-[44px]"
          >
            <span className="font-medium text-gray-900 block">{preset.label}</span>
            <span className="text-sm text-gray-600">{preset.description}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={resetPresets}
          className="w-full p-4 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors font-medium text-gray-700 min-h-[44px]"
        >
          Reset to default
        </button>
      </div>
    </div>
  )
}
