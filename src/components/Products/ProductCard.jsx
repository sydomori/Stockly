import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import '../../App.css';



const stockConfig = {
    in_stock: {
        label: 'In Stock',
        color: 'success'
    },
    low_stock: {
        label: 'Low Stock',
        color: 'warning'
    },
    out_of_stock: {
        label: 'Out of Stock',
        color: 'error'
    }
}




export default function ProductCard({product}) {
    const {name, price, category, image, rating, stock} = product;
    return (
        <Card sx={{bgcolor:'var(--card-surface)', borderRadius: 2, border: '1px solid var(--border)',display: 'flex', flexDirection: 'column', '&:hover': {boxShadow: '0 4px 12px var(--box-shadow)'}}}>
            <Box sx={{position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={name}
                    sx={{objectFit: 'cover'}}
                />
                <Chip
                    label={stockConfig[stock].label}
                    color={stockConfig[stock].color}
                    size="small"
                    sx={{position: 'absolute', top: 8, right: 8}}
                />
            </Box>
            <CardContent sx={{flexGrow: 1,pb: 2}}>
                <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center',mb: 0.5}}>
                    <Typography variant='caption' sx={{color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: 1}}>
                        {category}
                    </Typography>
                    <Box sx={{display:'flex', alignItems:'center', gap: 0.3}}>
                        <StarIcon sx={{color: '#f59e0b', fontSize: 14}} />
                        <Typography variant='caption' sx={{color: 'var(--muted-text)'}}>
                            {rating}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant='subtitle2' fontWeight="bold" sx={{color:'var(--text-primary)', mb: 0.5}}>
                    {name}
                </Typography>
                <Typography variant='body2' fontWeight="bold" sx={{color:'var(--text-primary)', mb: 0.5}}>
                    KES {price.toLocaleString()}
                </Typography>
            </CardContent>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', px: 2, pb: 2}}>
                <Button
                startIcon={<EditIcon />}
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{bgcolor: 'var(--primary-action)', mr: 1, borderColor: 'var(--border)', color: 'var(--background)'}}
                >
                    Edit
                </Button>
                <IconButton size='small' sx={{color:'error.main'}}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Card>
    )
}