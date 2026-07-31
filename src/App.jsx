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
import AdminUsers from './pages/AdminUsers'
import AdminSuppliers from './pages/AdminSuppliers'
import AdminCategories from './pages/AdminCategories'
import AdminActivityLog from './pages/AdminActivityLog'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<SetPassword />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/my-activity" element={<ProtectedRoute><MyActivity /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/suppliers" element={<ProtectedRoute adminOnly><AdminSuppliers /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute adminOnly><AdminCategories /></ProtectedRoute>} />
          <Route path="/admin/activity-log" element={<ProtectedRoute adminOnly><AdminActivityLog /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App