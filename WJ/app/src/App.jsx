import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AccessibilityProvider } from './context/AccessibilityContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Categories from './pages/Categories'
import Account from './pages/Account'
import Accessibility from './pages/Accessibility'
import FiltersSort from './pages/FiltersSort'

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="scan" element={<Navigate to="/search" replace />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:category" element={<Categories />} />
            <Route path="account" element={<Account />} />
            <Route path="account/accessibility" element={<Accessibility />} />
            <Route path="filters" element={<FiltersSort />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}

export default App
