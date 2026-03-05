import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../nav/TopNav'
import BottomNav from '../nav/BottomNav'
import SidebarMenu from '../nav/SidebarMenu'
import { useAccessibility } from '../../context/AccessibilityContext'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { largerText, highContrast, largerTouchTargets } = useAccessibility()

  const accessibilityClasses = [
    largerText && 'accessibility-larger-text',
    highContrast && 'accessibility-high-contrast',
    largerTouchTargets && 'accessibility-touch-large',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`min-h-full flex flex-col bg-[#fafafa] relative ${accessibilityClasses}`}>
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <main className="flex-1 w-full px-4 pb-20 min-w-0 min-h-0">
        <Outlet />
      </main>
      <BottomNav />
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  )
}
