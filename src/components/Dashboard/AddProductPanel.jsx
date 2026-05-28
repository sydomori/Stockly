import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../App.css'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function AddProductPanel({onCancel, onAddProduct}) {
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
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productImage, setProductImage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const newProduct = {
            name: productName,
            price: productPrice,
            category: productCategory,
            image: productImage
        };
        onAddProduct(newProduct);
        setProductName('');
        setProductPrice('');
        setProductCategory('');
        setProductImage('');
    }
    return (
       <Box sx={{color:'var(--text-primary)',bgcolor:'var(--card-surface)',p:3, mt:15, borderRadius:2}} component="form" onSubmit={handleSubmit}>
           <Stack direction="column" spacing={2}>
                <Stack>
                    <Typography variant='h5' mb={2}>Add Product</Typography>
                    <Typography sx={{color:'var(--muted-text)'}} variant='body2' mb={2}>Fill in the product details to add a new item to your inventory.</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField name="name" sx={inputStyles} label="Product Name" fullWidth size="small" placeholder='e.g JBL Headphones' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <TextField type='number' slotProps={{htmlInput:{step:500}}} name="price" sx={inputStyles} label="Price (KES)" fullWidth size="small" placeholder='2000' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                    <FormControl fullWidth size='small' sx={inputStyles}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            sx={{bgcolor:'var(--primary-action)'}}
                            value={productCategory}
                            label="Category"
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            <MenuItem value="audio">Audio</MenuItem>
                            <MenuItem value="footwear">Footwear</MenuItem>
                            <MenuItem value="wearables">Wearables</MenuItem>
                            <MenuItem value="cameras">Cameras</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField name='image' sx={inputStyles} label="Image URL" fullWidth size="small" placeholder='https://...' value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                </Stack>
                <Stack sx={{display:'flex', justifyContent:'flex-end'}} direction="row" spacing={2}>
                    <Button onClick={onCancel} sx={{width:'100px',color:'var(--text-primary)', '&:hover':{bgcolor:'var(--background)'}}}>Cancel</Button>
                    <Button type="submit" sx={{width:'200px', bgcolor:'var(--primary-action)',color:'var(--background)'}} variant="contained">Add</Button>
                </Stack>
            </Stack>
       </Box>
    )
}