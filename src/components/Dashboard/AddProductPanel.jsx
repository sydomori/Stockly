import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../App.css'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function AddProductPanel() {
    return (
       <Box sx={{color:'var(--text-primary)',bgcolor:'var(--card-surface)',p:3, mt:10, borderRadius:2}} component="form">
           <Stack direction="column" spacing={2}>
                <Typography variant='h6' mb={2}>Add Product</Typography>
                <Stack direction="row" spacing={2}>
                    <TextField label="Product Name" fullWidth margin="small" placeholder='e.g JBL Headphones' sx={{mb:2}} />
                    <TextField label="Price (KES)" fullWidth margin="small" placeholder='2000' sx={{mb:2}} />
                    <TextField label="Image URL" fullWidth margin="small" placeholder='https://...' sx={{mb:2}} />
                    <Button variant="contained" color="primary">Add Product</Button>
                </Stack>
                
            </Stack>
       </Box>
    )
}