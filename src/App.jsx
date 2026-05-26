import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

function App() {
  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
