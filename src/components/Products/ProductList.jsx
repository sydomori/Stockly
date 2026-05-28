import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

export default function ProductList({products}) {
    return (
        <Grid sx={{mt:2}} container spacing={2}>
            {products.map((product) => (
                <Grid sx={{pb:2}} size={{xs: 12, sm: 6, md: 4, lg: 3}} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}