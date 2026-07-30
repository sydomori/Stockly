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
import { getProducts, createProduct } from '../api/products'

export default function Dashboard() {
    const [open, setOpen] = useState(false)
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [view, setView] = useState('grid')
    const [products, setProducts] = useState([])
    const [error,setError] = useState('')

    function fetchProducts(){
        getProducts()
        .then(setProducts)
        .catch((error) => setError(error.message))
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    function handleAddProduct(productData){
        createProduct(productData)
        .then((newProduct)=>{
            setProducts((prevProducts) => [...prevProducts, newProduct])
            setIsAddingProduct(false)
        })
        .catch((error)=> setError(error.message))
    }

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 1, pb: 2 }}>
                <PageHeader isAddingProduct={isAddingProduct} onToggleAdd={() => setIsAddingProduct(!isAddingProduct)} filterOpen={open} setFilterOpen={setOpen} />
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
                <ToggleButtonGroup sx={{ mt: 9, bgcolor: 'var(--card-surface)', borderRadius: 1 }} value={view} exclusive onChange={(e, newValue) => newValue && setView(newValue)} size="small">
                    <ToggleButton sx={{ color: 'var(--text-primary)' }} value='grid'><GridViewIcon fontSize='small' /></ToggleButton>
                    <ToggleButton sx={{ color: 'var(--text-primary)' }} value='list'><ListIcon fontSize='small' /></ToggleButton>
                </ToggleButtonGroup>
                {error && <Box sx={{ color: 'error.main', mt: 2 }}>{error}</Box>}
                {view === 'grid' ? <ProductList products={products.slice(0, 4)} /> : <ProductTable products={products.slice(0, 4)} />}
            </Container>
        </>
    )
}