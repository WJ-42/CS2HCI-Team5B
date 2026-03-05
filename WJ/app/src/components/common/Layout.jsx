import { Outlet, useLocation } from 'react-router-dom'
import TopNav from '../nav/TopNav'
import BottomNav from '../nav/BottomNav'
import StickyScanButton from './StickyScanButton'
import OfflineBanner from './OfflineBanner'
import { useAccessibility } from '../../context/AccessibilityContext'

export default function Layout() {
  const location = useLocation()
  const { largerText, highContrast, largerTouchTargets } = useAccessibility()
  const isSearchPage = location.pathname === '/search'

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
      <main className={`flex-1 pb-20 md:pb-6 mx-auto w-full px-4 ${isSearchPage ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <Outlet />
      </main>
      <StickyScanButton />
      <BottomNav />
    </div>
  )
}
