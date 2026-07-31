import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import NavBar from '../components/layout/NavBar'
import PageHeader from '../components/ui/PageHeader'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddProductPanel from '../components/Dashboard/AddProductPanel'
import ProductList from '../components/Products/ProductList'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import ProductTable from '../components/Products/productTable'
import { getProducts, createProduct, deleteProduct, updateProduct } from '../api/products'
import {getCategories} from '../api/categories'
import EditProductPanel from '../components/Products/EditProductPanel'

export default function Dashboard() {
    const [open, setOpen] = useState(false)
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [view, setView] = useState('grid')
    const [products, setProducts] = useState([])
    const [error,setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

   function fetchData() {
      Promise.all([getProducts(), getCategories()])
        .then(([productsData, categoriesData]) => {
            const categoryMap = Object.fromEntries(categoriesData.map(c => [c.id, c.name]));
            const enrichedProducts = productsData.map(p => ({
                ...p,
                category_name: categoryMap[p.category_id]
            }));
            setProducts(enrichedProducts);
        })
        .catch((err) => setError(err.message));
   }

    useEffect(() => {
        fetchData();
    }, [])

    function handleAddProduct(productData){
        createProduct(productData)
        .then(()=>{
            fetchData()
            setIsAddingProduct(false)
        })
        .catch((error)=> setError(error.message))
    }

    function handleEditProduct(product){
         setEditingProduct(product)
        }
    
    function handleUpdateProduct(id, productData){
        updateProduct(id, productData)
        .then(()=>{
        fetchData()
        setEditingProduct(null)
        })
        .catch((error)=>setError(error.message))
    }

    function handleDeleteProduct(id){
        deleteProduct(id)
        .then(()=>{
        fetchData()
        })
        .catch((error)=> setError(error.message))
    }

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 1, pb: 2 }}>
                <PageHeader isAddingProduct={isAddingProduct} onToggleAdd={() => setIsAddingProduct(!isAddingProduct)} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <Collapse in={open}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2, p: 2, bgcolor: 'var(--primary-action)', borderRadius: 1, width: '300px' }}>
                        <Select size="small" defaultValue="all" sx={{ width: '200px' }}>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                        <Select size="small" defaultValue="all" sx={{ minWidth: 150 }}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="in_stock">In Stock</MenuItem>
                            <MenuItem value="low_stock">Low Stock</MenuItem>
                            <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                        </Select>
                    </Box>
                </Collapse>
                <AddProductPanel open={isAddingProduct} onCancel={() => setIsAddingProduct(false)} onAddProduct={handleAddProduct} />
                <EditProductPanel open={Boolean(editingProduct)} product={editingProduct} onCancel={()=>setEditingProduct(null)} onUpdateProduct={handleUpdateProduct} />
                <ToggleButtonGroup sx={{ mt: 9, bgcolor: 'var(--card-surface)', borderRadius: 1 }} value={view} exclusive onChange={(e, newValue) => newValue && setView(newValue)} size="small">
                    <ToggleButton sx={{ color: 'var(--text-primary)' }} value='grid'><GridViewIcon fontSize='small' /></ToggleButton>
                    <ToggleButton sx={{ color: 'var(--text-primary)' }} value='list'><ListIcon fontSize='small' /></ToggleButton>
                </ToggleButtonGroup>
                {error && <Box sx={{ color: 'error.main', mt: 2 }}>{error}</Box>}
                {view === 'grid' ? <ProductList onEdit={handleEditProduct} onDelete={handleDeleteProduct} products={filteredProducts.slice(0, 4)} /> : <ProductTable products={filteredProducts.slice(0, 4)} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />}
            </Container>
        </>
    )
}