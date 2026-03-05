import AccessibilityToggles from '../components/accessibility/AccessibilityToggles'
import AccessibilityPresets from '../components/accessibility/AccessibilityPresets'

export default function Accessibility() {
  return (
    <div className="py-4 space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Presets</h2>
        <AccessibilityPresets />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Options</h2>
        <AccessibilityToggles />
      </section>
    </div>
  )
}
