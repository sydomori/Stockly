import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductRow from './ProductRow';

export default function ProductTable({products}){
    return (
        <Box>
            <Box sx={{display:'flex',alignItems:'center',gap:2,px:2,py:2,mb:1,borderBottom:'1px solid var(--border)'}}>
                <Box sx={{width:60,flexShrink:0}}/>
                    <Typography variant='caption' sx={{flex:2,color:'var(-muted-text', textTransform:'uppercase',letterSpacing1}}>Product</Typography>
                    <Typography variant='caption' sx={{flex:2,color:'var(-muted-text', textTransform:'uppercase',letterSpacing1}}>Price</Typography>
                    <Typography variant='caption' sx={{flex:2,color:'var(-muted-text', textTransform:'uppercase',letterSpacing1}}>Stock</Typography>
                    <Typography variant='caption' sx={{flex:2,color:'var(-muted-text', textTransform:'uppercase',letterSpacing1}}>Rating</Typography>
                <Box sx={{width:120,flexShrink:0}}/>
            </Box>
            {products.map((product) => (
                <ProductRow key={product.id} product={product}/>
            ))}  
        </Box>
        
    );  
}