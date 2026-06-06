import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sciences from './pages/Sciences'
import ScienceDetail from './pages/ScienceDetail'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import DataResults from './pages/DataResults'
import Recommend from './pages/Recommend'
import Conclusions from './pages/Conclusions'
import About from './pages/About'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/sciences"           element={<Sciences />} />
          <Route path="/sciences/:slug"     element={<ScienceDetail />} />
          <Route path="/products"           element={<Products />} />
          <Route path="/products/:id"       element={<ProductDetail />} />
          <Route path="/data"               element={<DataResults />} />
          <Route path="/recommend"          element={<Recommend />} />
          <Route path="/conclusions"        element={<Conclusions />} />
          <Route path="/about"              element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
