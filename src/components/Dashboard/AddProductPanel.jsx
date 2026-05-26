import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../App.css'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function AddProductPanel() {
    return (
       <Box sx={{color:'var(--text-primary)',bgcolor:'var(--card-surface)', mb:3, borderRadius:2}} component="form">
            <Typography variant='h6' mb={2}>Add Product</Typography>
            <Stack direction="row" spacing={2}>
                <TextField label="Product Name" fullWidth margin="normal" placeholder='e.g JBL Headphones' sx={{mb:2}} />
                <TextField label="Price (KES)" fullWidth margin="normal" placeholder='2000' sx={{mb:2}} />
                <TextField label="Image URL" fullWidth margin="normal" placeholder='https://...' sx={{mb:2}} />
            </Stack>

       </Box>
    )
}