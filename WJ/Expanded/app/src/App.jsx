import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './app/providers/AppProvider'
import Layout from './components/common/Layout'
import PhoneFrame from './components/common/PhoneFrame'
import Home from './pages/Home'
import Search from './pages/Search'
import Account from './pages/Account'
import Accessibility from './pages/Accessibility'
import FiltersSort from './pages/FiltersSort'
import ProductDetail from './pages/ProductDetail'
import Scan from './pages/Scan'
import Wishlist from './pages/Wishlist'
import Compare from './pages/Compare'

function App() {
  return (
    <AppProvider>
      <PhoneFrame>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="scan" element={<Scan />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="account" element={<Account />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="account/accessibility" element={<Accessibility />} />
            <Route path="filters" element={<FiltersSort />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="compare" element={<Compare />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </PhoneFrame>
    </AppProvider>
  )
}

export default App
