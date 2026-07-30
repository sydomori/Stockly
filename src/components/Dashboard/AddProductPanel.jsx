import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getCategories } from '../../api/categories'

export default function AddProductPanel({ open, onCancel, onAddProduct }) {
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

    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            getCategories()
                .then(setCategories)
                .catch(() => setError('Failed to load categories'));
        }
    }, [open]);

    function resetForm() {
        setProductName('');
        setSku('');
        setProductPrice('');
        setStockQuantity('');
        setCategoryId('');
        setImageUrl('');
        setError('');
    }

    function handleCancel() {
        resetForm();
        onCancel();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newProduct = {
            name: productName,
            sku: sku,
            price: parseFloat(productPrice),
            stock_quantity: parseInt(stockQuantity, 10),
            category_id: categoryId,
            image_url: imageUrl,
        };
        onAddProduct(newProduct);
        resetForm();
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
                    Add Product
                    <Typography sx={{ color: 'var(--muted-text)' }} variant='body2'>
                        Fill in the product details to add a new item to your inventory.
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Stack direction="column" spacing={2} mt={1}>
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        <Stack direction="row" spacing={2}>
                            <TextField name="name" sx={inputStyles} label="Product Name" fullWidth size="small" placeholder='e.g JBL Headphones' value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <TextField name="sku" sx={inputStyles} label="SKU" fullWidth size="small" placeholder='e.g JBL-001' value={sku} onChange={(e) => setSku(e.target.value)} />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField type='number' slotProps={{ htmlInput: { step: 500 } }} name="price" sx={inputStyles} label="Price (KES)" fullWidth size="small" placeholder='2000' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                            <TextField type='number' name="stock_quantity" sx={inputStyles} label="Stock Quantity" fullWidth size="small" placeholder='50' value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth size='small' sx={inputStyles}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    sx={{ bgcolor: 'var(--primary-action)' }}
                                    value={categoryId}
                                    label="Category"
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField name='image_url' sx={inputStyles} label="Image URL" fullWidth size="small" placeholder='https://...' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCancel} sx={{ color: 'var(--text-primary)', '&:hover': { bgcolor: 'var(--background)' } }}>Cancel</Button>
                    <Button type="submit" sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }} variant="contained">Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}