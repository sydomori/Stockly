import React from 'react'
import Container from '@mui/material/Container'
import NavBar from '../components/layout/NavBar'
import PageHeader from '../components/ui/PageHeader'
import { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddProductPanel from '../components/Dashboard/AddProductPanel'
import ProductList from '../components/Products/ProductList'
import { useEffect } from 'react'

export default function Dashboard() {
    const [open, setOpen] = useState(false)
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [products, setProducts] = useState([])

    const url = 'http://localhost:5000/products'

    function addProduct(product){
        const productsWithDefaults = {
            ...product,
            stock:'in_stock',
            rating: 0
        }

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsWithDefaults)
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

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <NavBar />
            <Container>
                <PageHeader isAddingProduct={isAddingProduct} onToggleAdd={()=> setIsAddingProduct(!isAddingProduct)} filterOpen={open} setFilterOpen={setOpen} />
                <Collapse in={open} sx={{mt: -5.0, ml:100}}>
                    <Box sx={{display: 'flex', gap: 2, mt: 2, p: 2, bgcolor: 'var(--primary-action)', borderRadius: 1, width: '300px'}}>
                        <Select size="small" defaultValue="all" sx={{width: '200px'}}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="audio">Audio</MenuItem>
                            <MenuItem value="footwear">Footwear</MenuItem>
                            <MenuItem value="wearables">Wearables</MenuItem>
                            <MenuItem value="cameras">Cameras</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                        </Select>

                        <Select size="small" defaultValue="all" sx={{minWidth: 150}}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="in_stock">In Stock</MenuItem>
                            <MenuItem value="low_stock">Low Stock</MenuItem>
                            <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                        </Select>
                    </Box>
                </Collapse>
                <Collapse in={isAddingProduct}>
                    <AddProductPanel onCancel={() => setIsAddingProduct(false)} onAddProduct={addProduct}/>
                </Collapse>
                <ProductList products={products} />
            </Container>
            
        </>
    )
}