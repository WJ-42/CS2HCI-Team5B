import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <div className="py-6 space-y-8">
      <h1 className="text-xl font-semibold text-gray-900">Account and settings</h1>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account info</h2>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">Jane Doe</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">jane@example.com</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <div className="space-y-2">
          <Link
            to="/account/accessibility"
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 min-h-[44px]"
          >
            <span className="font-medium text-gray-900">Accessibility settings</span>
            <span className="text-gray-500">→</span>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your activity</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
            <span className="font-medium text-gray-900">Saved items</span>
            <span className="text-sm text-gray-500">0 items (placeholder)</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
            <span className="font-medium text-gray-900">Comparison tool</span>
            <span className="text-sm text-gray-500">Side-by-side comparison (placeholder)</span>
          </div>
        </div>
      </section>
    </div>
  )
}
