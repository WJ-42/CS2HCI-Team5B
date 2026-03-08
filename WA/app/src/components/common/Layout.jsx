import { Outlet, useLocation } from 'react-router-dom'
import TopNav from '../nav/TopNav'
import BottomNav from '../nav/BottomNav'
import { useAccessibility } from '../../context/AccessibilityContext'

export default function Layout() {
  const location = useLocation()
  const { largerText, highContrast, largerTouchTargets } = useAccessibility()
  const isWideLayout = location.pathname === '/search' || location.pathname === '/'

  const accessibilityClasses = [
    largerText && 'accessibility-larger-text',
    highContrast && 'accessibility-high-contrast',
    largerTouchTargets && 'accessibility-touch-large',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`min-h-screen flex flex-col ${accessibilityClasses}`}>
      <TopNav />
      <main className={`flex-1 pb-20 md:pb-6 mx-auto w-full px-4 ${isWideLayout ? 'max-w-6xl' : 'max-w-4xl'}`}>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
