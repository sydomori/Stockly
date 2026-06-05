import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NavBar from '../components/layout/NavBar'
import ProductList from '../components/Products/ProductList'
import PageHeader from '../components/ui/PageHeader'
import Collapse from '@mui/material/Collapse'
import AddProductPanel from '../components/Dashboard/AddProductPanel'
import { useState } from 'react'

export default function Products({products,addProduct}) {
    const [isAddingProduct, setIsAddingProduct] = useState(false)

    return (
        <Container>
            <NavBar />
            <PageHeader
                isAddingProduct={isAddingProduct}
                onToggleAdd={() => setIsAddingProduct(!isAddingProduct)}
            />
            <Collapse in={isAddingProduct}>
                <AddProductPanel
                    onCancel={() => setIsAddingProduct(false)}
                    onAddProduct={addProduct}
                />
            </Collapse>
            <Container disableGutters sx={{mt:10}}>
             <Box>
                <Typography sx={{color:'#ffffff'}} variant="h4" fontWeight="bold">
                    Your Products
                </Typography>
                <ProductList products={products} />
             </Box>
            </Container>
        </Container>
    )
}
