import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NavBar from '../components/layout/NavBar'
import ProductList from '../components/Products/ProductList'
import PageHeader from '../components/ui/PageHeader'
import Collapse from '@mui/material/Collapse'
import AddProductPanel from '../components/Dashboard/AddProductPanel'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import ProductTable from '../components/Products/productTable'

export default function Products({products,addProduct}) {
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [view, setView] = useState('grid')

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
                <ToggleButtonGroup sx={{mt:2, bgcolor: 'var(--card-surface)', borderRadius: 1}} value={view} exclusive onChange={(e, newValue) => newValue && setView(newValue)} size="small">
                    <ToggleButton sx={{color: 'var(--text-primary)'}} value='grid'><GridViewIcon fontSize='small'/></ToggleButton>
                    <ToggleButton sx={{color: 'var(--text-primary)'}} value='list'><ListIcon fontSize='small' /></ToggleButton>
                </ToggleButtonGroup>
                {
                    view === 'grid' ? <ProductList products={products} /> : <ProductTable products={products} />
                }
             </Box>
            </Container>
        </Container>
    )
}
