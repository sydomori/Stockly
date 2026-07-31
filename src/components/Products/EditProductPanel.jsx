import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState, useEffect } from 'react'
import { getCategories } from '../../api/categories'


export default function EditProductPanel({ open, product, onCancel, onUpdateProduct }) {

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            bgcolor: 'var(--background)',
            borderRadius: 3,
            '& fieldset': { borderColor: 'var(--border)' },
            '&:hover fieldset': { borderColor: 'var(--border)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--primary-action)' },
        },
        '& .MuiInputLabel-root': { color: 'var(--muted-text)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-action)' },
        '& .MuiOutlinedInput-input': { color: 'var(--muted-text)' },
    };

    const [productName, setProductName] = useState('')
    const [sku, setSku] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [stockQuantity, setStockQuantity] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if(product){
            setProductName(product.name)
            setSku(product.sku)
            setProductPrice(product.price)
            setStockQuantity(product.stock_quantity)
            setCategoryId(product.category_id)
            setImageUrl(product.image_url || '')
        }
    }, [product])

    useEffect(() => {
        if(open){
            getCategories()
                .then(setCategories)
                .catch(() => setError('Failed to load categories'))
        }
    }, [open])

    function handleSubmit(e){
        e.preventDefault()
        const updatedProduct = {
            name: productName,
            sku,
            price: Number(productPrice),
            stock_quantity: Number(stockQuantity),
            category_id: categoryId,
            image_url: imageUrl
        }
       onUpdateProduct(product.id, updatedProduct)
    }

    function handleCancel(){
        onCancel()
    }

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { bgcolor: 'var(--card-surface)', color: 'var(--text-primary)', borderRadius: 2 } }}
        >
            <Box component="form" onSubmit={handleSubmit}>

                <DialogTitle>
                    Edit Product
                    <Typography sx={{ color: 'var(--muted-text)' }} variant="body2">
                        Update the product details below.
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>

                        {error && <Typography color="error" variant="body2">{error}</Typography>}

                        <Stack direction="row" spacing={2}>
                            <TextField sx={inputStyles} label="Product Name" fullWidth size="small" value={productName} onChange={(e)=>setProductName(e.target.value)} />
                            <TextField sx={inputStyles} label="SKU" fullWidth size="small" value={sku} disabled />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <TextField type="number" sx={inputStyles} label="Price (KES)" fullWidth size="small" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} />
                            <TextField type="number" sx={inputStyles} label="Stock Quantity" fullWidth size="small" value={stockQuantity} onChange={(e)=>setStockQuantity(e.target.value)} />
                        </Stack>

                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth size="small" sx={inputStyles}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryId}
                                    label="Category"
                                    onChange={(e)=>setCategoryId(e.target.value)}
                                >
                                    {categories.map((cat)=>(
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField sx={inputStyles} label="Image URL" fullWidth size="small" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} />
                        </Stack>

                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCancel} sx={{bgcolor: 'var(--card-surface)', color: 'var(--text-primary)', '&:hover': { bgcolor: 'var(--background)' } }}>
                        Cancel
                    </Button>

                    <Button type="submit" sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }} variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}