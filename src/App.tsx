import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sciences from './pages/Sciences'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import DataResults from './pages/DataResults'
import Recommend from './pages/Recommend'
import Conclusions from './pages/Conclusions'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/sciences"     element={<Sciences />} />
          <Route path="/products"     element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/data"         element={<DataResults />} />
          <Route path="/recommend"    element={<Recommend />} />
          <Route path="/conclusions"  element={<Conclusions />} />
          <Route path="/about"        element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
