import { Link } from 'react-router-dom'
import AccessibilityToggles from '../components/AccessibilityToggles'
import AccessibilityPresets from '../components/AccessibilityPresets'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Accessibility() {
  const { simpleNavMode, screenReaderMode, setToggle } = useAccessibility()

  return (
    <div className="py-6 space-y-8">
      <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
        <Link to="/account" className="hover:text-green-600">
          Account
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Accessibility</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">Accessibility settings</h1>

      <section>
        <AccessibilityPresets />
      </section>

      <section>
        <AccessibilityToggles />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Simple navigation mode</h2>
        <p className="text-sm text-gray-600 mb-4">
          Reduces clutter and shows fewer menu items for easier navigation.
        </p>
        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={simpleNavMode}
            onChange={(e) => setToggle('simpleNavMode', e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="font-medium text-gray-900">Enable simple navigation mode</span>
        </label>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Screen reader compatibility</h2>
        <p className="text-sm text-gray-600 mb-4">
          This app includes semantic HTML, ARIA labels, and structured headings for screen readers.
          Toggle hints for extra context.
        </p>
        <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={screenReaderMode}
            onChange={(e) => setToggle('screenReaderMode', e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className="font-medium text-gray-900">Screen reader hints</span>
        </label>
      </section>
    </div>
  )
}
