import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import Products from './components/Products/Products'

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
