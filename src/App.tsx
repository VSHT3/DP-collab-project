import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Methodology from './pages/Methodology'
import Sciences from './pages/Sciences'
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
          <Route path="/"            element={<Home />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/sciences"    element={<Sciences />} />
          <Route path="/data"        element={<DataResults />} />
          <Route path="/recommend"   element={<Recommend />} />
          <Route path="/conclusions" element={<Conclusions />} />
          <Route path="/about"       element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
