import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  
  const url = 'http://localhost:5000/products'

  function addProduct(product){
    const productWithDefaults = {
      ...product,
      stock: 'in_stock',
      rating:0
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productWithDefaults)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error('Failed to add product')
      }
      return response.json()
    })
    .then((newProduct)=>{
      setProducts((prevProducts) => [...prevProducts, newProduct])
    })
    .catch((error)=>{
      console.error('Error adding product:', error)
    })
  }

  function fetchProducts(){
    fetch(url)
    .then((response)=>{
      if(!response.ok){
        throw new Error('Failed to fetch products')
      }
      return response.json()
    })
    .then((data)=>{
      setProducts(data)
    })
    .catch((error)=>{
      console.error('Error fetching products:', error)
    })
  }

  useEffect(()=>{
    fetchProducts()
  }, [])

  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Dashboard products={products} addProduct={addProduct} />} />
        <Route path="/products" element={<Products />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
