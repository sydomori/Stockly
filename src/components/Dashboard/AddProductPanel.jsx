import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import '../../App.css'

export default function AddProductPanel() {
    return (
       <Box sx={{color:'var(--text-primary)',bgcolor:'var(--card-surface)', mb:3, borderRadius:2}} component="form">
        <Typography variant='h6' mb={2}>Add Product</Typography>
       </Box>
    )
}