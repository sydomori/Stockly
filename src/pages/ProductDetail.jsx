import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NavBar from '../components/layout/NavBar'
import { getProduct } from '../api/products'
import { getCategories } from '../api/categories'
import { getStockStatus } from '../helpers/stock'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([getProduct(id), getCategories()])
            .then(([productData, categoriesData]) => {
                setProduct(productData)
                const match = categoriesData.find(c => c.id === productData.category_id)
                setCategoryName(match ? match.name : 'Uncategorized')
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <><NavBar /><Container sx={{ mt: 12 }}><Typography>Loading...</Typography></Container></>
    if (error) return <><NavBar /><Container sx={{ mt: 12 }}><Typography color="error">{error}</Typography></Container></>
    if (!product) return null

    const badge = getStockStatus(product.stock_quantity)

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ color: 'var(--text-primary)', mb: 2 }}>
                    Back
                </Button>
                <Box sx={{ display: 'flex', gap: 4, bgcolor: 'var(--card-surface)', p: 3, borderRadius: 2 }}>
                    <Box
                        component="img"
                        src={product.image_url}
                        alt={product.name}
                        sx={{ width: 300, height: 300, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
                    />
                    <Box sx={{ color: 'var(--text-primary)' }}>
                        <Typography variant="caption" sx={{ color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: 1 }}>
                            {categoryName}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" mb={1}>{product.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'var(--muted-text)' }} mb={2}>SKU: {product.sku}</Typography>
                        <Chip label={badge.label} color={badge.color} sx={{ mb: 2 }} />
                        <Typography variant="h5" fontWeight="bold" mb={1}>KES {product.price.toLocaleString()}</Typography>
                        <Typography variant="body2">Stock quantity: {product.stock_quantity}</Typography>
                        <Typography variant="caption" sx={{ color: 'var(--muted-text)' }}>
                            Added: {new Date(product.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    )
}