import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

export default function ProductList({products}) {
    return (
        <Grid sx={{mt:15}} container spacing={2}>
            {products.map((product) => (
                <Grid sx={{padding:'10px'}} size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}