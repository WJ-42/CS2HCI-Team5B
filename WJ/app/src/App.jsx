import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './app/providers/AppProvider'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Categories from './pages/Categories'
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="scan" element={<Scan />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:category" element={<Categories />} />
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
    </AppProvider>
  )
}

export default App
