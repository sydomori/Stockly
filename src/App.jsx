import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SetPassword from './pages/setPassword'
import ProtectedRoute from './components/login/protectedRoute'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import { AuthProvider } from './context/AuthContext'
import ProductDetail from './pages/ProductDetail'
import MyActivity from './pages/MyActivity'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/my-activity" element={<ProtectedRoute><MyActivity /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App