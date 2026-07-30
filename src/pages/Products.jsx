import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NavBar from '../components/layout/NavBar'
import ProductList from '../components/Products/ProductList'
import PageHeader from '../components/ui/PageHeader'
import AddProductPanel from '../components/Dashboard/AddProductPanel'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import ProductTable from '../components/Products/productTable'
import { getProducts, createProduct, deleteProduct, updateProduct} from '../api/products'
import {getCategories} from '../api/categories'
import EditProductPanel from '../components/Products/EditProductPanel'


export default function Products(){
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [view, setView] = useState('grid')
    const [products, setProducts] = useState([])
    const [error,setError] = useState('')

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
        fetchData()
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

    return (
        <Container>
            <NavBar />
            <PageHeader
                isAddingProduct={isAddingProduct}
                onToggleAdd={() => setIsAddingProduct(!isAddingProduct)}
            />
            <AddProductPanel
                open={isAddingProduct}
                onCancel={() => setIsAddingProduct(false)}
                onAddProduct={handleAddProduct}
            />
            <EditProductPanel
              open={Boolean(editingProduct)}
              product={editingProduct}
              onCancel={()=>setEditingProduct(null)}
              onUpdateProduct={handleUpdateProduct}
            />
            <Container disableGutters sx={{ mt: 10 }}>
                <Box>
                    <Typography sx={{ color: '#ffffff' }} variant="h4" fontWeight="bold">
                        Your Products
                    </Typography>
                    <ToggleButtonGroup sx={{ mt: 2, bgcolor: 'var(--card-surface)', borderRadius: 1 }} value={view} exclusive onChange={(e, newValue) => newValue && setView(newValue)} size="small">
                        <ToggleButton sx={{ color: 'var(--text-primary)' }} value='grid'><GridViewIcon fontSize='small' /></ToggleButton>
                        <ToggleButton sx={{ color: 'var(--text-primary)' }} value='list'><ListIcon fontSize='small' /></ToggleButton>
                    </ToggleButtonGroup>
                    {error && <Box sx={{ color: 'error.main', mt: 2 }}>{error}</Box>}
                    {view === 'grid' ? <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} /> : <ProductTable products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />}
                </Box>
            </Container>
        </Container>

    )
}