import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getStockStatus } from '../../helpers/stock';
import { useNavigate } from 'react-router-dom';

export default function ProductRow({product, onEdit, onDelete}){
    const { name, price, category_name, image_url, stock_quantity } = product;
    const badge = getStockStatus(stock_quantity);
    const navigate = useNavigate()


    return (
       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'var(--card-surface)', border: '1px solid var(--border)', borderRadius: 2, mb: 1 }}>
            <Box 
             component='img' 
             src={image_url} 
             alt={name}
             onClick = {() => navigate(`/products/${product.id}`)} 
             sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, flexShrink: 0 }} 
            />
            <Box sx={{ flex: 1 }}>
                <Typography onClick={() => navigate(`/products/${product.id}`)} variant='subtitle2' fontWeight='bold' sx={{ color: 'var(--text-primary)' }}>
                    {name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--muted-text)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {category_name || 'Uncategorized'}
                </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant='body2' fontWeight='bold' sx={{ color: 'var(--text-primary)' }}>
                    KES {price.toLocaleString()}
                </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Chip size='small' label={badge.label} color={badge.color} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                <Button onClick={() => onEdit(product)} variant='outlined' color='inherit' size='small' sx={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }} startIcon={<EditIcon />}>
                    Edit
                </Button>
                <IconButton onClick={() => onDelete(product)} sx={{ size: 'small', color: 'error.main' }}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
            </Box>
        </Box>

    )
}