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
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import ProductTable from '../components/Products/productTable'



export default function Dashboard({products, addProduct}) {
    const [open, setOpen] = useState(false)
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [view, setView] = useState('grid')

    return (
        <>
            <NavBar />
            <Container sx={{mt: 1, pb: 2}}>
                <PageHeader isAddingProduct={isAddingProduct} onToggleAdd={()=> setIsAddingProduct(!isAddingProduct)} filterOpen={open} setFilterOpen={setOpen} />
                <Collapse in={open}>
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
                <ToggleButtonGroup sx={{mt:9, bgcolor: 'var(--card-surface)', borderRadius: 1}} value={view} exclusive onChange={(e, newValue) => newValue && setView(newValue)} size="small">
                    <ToggleButton sx={{color: 'var(--text-primary)'}} value='grid'><GridViewIcon  fontSize='small'/></ToggleButton>
                    <ToggleButton sx={{color: 'var(--text-primary)'}} value='list'><ListIcon fontSize='small' /></ToggleButton>
                </ToggleButtonGroup>
                {
                    view === 'grid' ? <ProductList products={products} /> : <ProductTable products = {products} />
                }
            </Container>
            
        </>
    )
}