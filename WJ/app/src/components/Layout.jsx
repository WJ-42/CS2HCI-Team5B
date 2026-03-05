import { Outlet } from 'react-router-dom'
import TopNav from './TopNav'
import BottomNav from './BottomNav'
import StickyScanButton from './StickyScanButton'
import OfflineBanner from './OfflineBanner'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Layout() {
  const { largerText, highContrast, largerTouchTargets } = useAccessibility()

  const accessibilityClasses = [
    largerText && 'accessibility-larger-text',
    highContrast && 'accessibility-high-contrast',
    largerTouchTargets && 'accessibility-touch-large',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`min-h-screen flex flex-col ${accessibilityClasses}`}>
      <OfflineBanner />
      <TopNav />
      <main className="flex-1 pb-20 md:pb-6 max-w-4xl mx-auto w-full px-4">
        <Outlet />
      </main>
      <StickyScanButton />
      <BottomNav />
    </div>
  )
}
