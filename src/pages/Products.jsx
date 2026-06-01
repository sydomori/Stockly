import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import NavBar from '../components/layout/NavBar'
import ProductList from '../components/Products/ProductList'
export default function Products({products}) {
    return (
        <Container>
            <NavBar />
            <Container sx={{mt:10}}>
             <Typography sx={{color:'#ffffff'}} variant="h4" fontWeight="bold">
                Your Products
             </Typography>
             <ProductList products={products} />
            </Container>
        </Container>
    )
}