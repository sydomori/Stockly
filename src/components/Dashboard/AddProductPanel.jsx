import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../App.css'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function AddProductPanel() {
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
    return (
       <Box sx={{color:'var(--text-primary)',bgcolor:'var(--card-surface)',p:3, mt:10, borderRadius:2}} component="form">
           <Stack direction="column" spacing={2}>
                <Stack>
                    <Typography variant='h5' mb={2}>Add Product</Typography>
                    <Typography sx={{color:'var(--muted-text)'}} variant='body2' mb={2}>Fill in the product details to add a new item to your inventory.</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField name="name" sx={inputStyles} label="Product Name" fullWidth size="small" placeholder='e.g JBL Headphones' />
                    <TextField name="price" sx={inputStyles} label="Price (KES)" fullWidth size="small" placeholder='2000' />
                    <TextField name="category" sx={inputStyles} label="Category" fullWidth size="small" placeholder='e.g Electronics' />
                    <TextField name='image' sx={inputStyles} label="Image URL" fullWidth size="small" placeholder='https://...' />
                    <Button sx={{width:'200px', bgcolor:'var(--primary-action)',color:'var(--background)'}} variant="contained">Add</Button>
                </Stack>
            </Stack>
       </Box>
    )
}