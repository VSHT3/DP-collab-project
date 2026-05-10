import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Methodology from './pages/Methodology'
import DataResults from './pages/DataResults'
import Recommend from './pages/Recommend'
import Conclusions from './pages/Conclusions'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/data"        element={<DataResults />} />
          <Route path="/recommend"   element={<Recommend />} />
          <Route path="/conclusions" element={<Conclusions />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
