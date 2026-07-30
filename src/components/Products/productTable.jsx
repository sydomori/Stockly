import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductRow from './ProductRow';

export default function ProductTable({products}){
    return(
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 2, mb: 1, borderBottom: '1px solid var(--border)' }}>
                <Box sx={{ width: 60, flexShrink: 0 }} />
                <Typography variant='caption' sx={{ flex: 1.5, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Product</Typography>
                <Typography variant='caption' sx={{ flex: 1.4, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Price</Typography>
                <Typography variant='caption' sx={{ flex: 2.1, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Stock</Typography>
                <Box sx={{ width: 120, flexShrink: 0 }} />
            </Box>
            {products.map((product) => (
                <ProductRow key={product.id} product={product} />
            ))}
        </Box>
    )
}