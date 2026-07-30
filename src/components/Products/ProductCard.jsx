import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import '../../App.css';
import { getStockStatus } from '../../helpers/stock';

export default function ProductCard({product, onEdit, onDelete}){
    console.log(onEdit)
    const {name, price, category_name, image_url, stock_quantity} = product
    const badge = getStockStatus(stock_quantity);

    return (
        <Card sx={{ bgcolor: 'var(--card-surface)', borderRadius: 2, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: '0 4px 12px var(--box-shadow)' } }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image_url}
                    alt={name}
                    sx={{ objectFit: 'cover' }}
                />
                <Chip
                    label={badge.label}
                    color={badge.color}
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, pb: 2 }}>
                <Typography variant='caption' sx={{ color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5, display: 'block' }}>
                    {category_name || 'Uncategorized'}
                </Typography>
                <Typography variant='subtitle2' fontWeight="bold" sx={{ color: 'var(--text-primary)', mb: 0.5 }}>
                    {name}
                </Typography>
                <Typography variant='body2' fontWeight="bold" sx={{ color: 'var(--text-primary)', mb: 0.5 }}>
                    KES {price.toLocaleString()}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
                <Button
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    onClick={() => onEdit(product)}
                    sx={{ bgcolor: 'var(--primary-action)', mr: 1, borderColor: 'var(--border)', color: 'var(--background)' }}
                >
                    Edit
                </Button>
                <IconButton 
                 size='small' 
                 sx={{ color: 'error.main' }}
                 onClick={() => onDelete(product.id)}
                
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        </Card>
    )
}