import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const stockConfig = {
    in_stock: {label: 'In Stock', color:'success'},
    low_stock: {label:'Low Stock', color:'warning'},
    out_of_stock: {label:'Out of Stock', color:'error'}
}

export default function ProductRow({product}){
    const {name, price, category, image, rating,stock} = product;
    const badge = stockConfig[stock] || {label:'Unknown', color:'default'};
    
    return (
        <Box sx={{display:'flex', alignItems:'center', gap:2,p:2, bgcolor:'var(--card-surface)',border:'1px solid var(--border)',borderRadius:2,mb:1}}>
            <Box component='img' src={image} alt={name} sx={{width:64, height:64, objectFit:'cover', borderRadius:1,flexShrink:0}} />
            <Box sx={{flex:1}}>
                <Typography variant='subtitle2' fontWeight='bold' sx={{color:'var(--text-primary)'}}>
                    {name}
                </Typography>
                <Typography variant="caption" sx={{color:'var(--muted-text)',textTransform:'uppercase',letterSpacing:1}}>
                    {category}
                </Typography>
            </Box>
            <Box sx={{flex:1}}>
                <Typography variant='body2' fontWeight='bold' sx={{color:'var(--text-primary)'}}>
                    KES {price.toLocaleString()}
                </Typography>
            </Box>
            <Box sx={{flex:1}}>
                <Chip size='small' label={badge.label} color={badge.color} />
            </Box>
            <Box sx={{flex:1, display:'flex', alignItems:'center', gap:0.5}}>
                <StarIcon sx={{fontSize:16, color:'#f59e0b'}} />
                <Typography variant='caption' sx={{color:'var(--muted-text)'}}>
                    {rating}
                </Typography>
            </Box>
            <Box sx={{flex:1, display:'flex', alignItems:'center', gap:1, flexShrink:0}}>
                <Button variant='outlined' color='inherit' size='small' sx={{borderColor:'var(--border)',color:'var(--text-primary)'}} startIcon={<EditIcon />}>
                    Edit
                </Button>
                <IconButton sx={{size:'small', color:'error.main'}}>
                    <DeleteIcon fontSize='small'/>
                </IconButton>
            </Box>
        </Box>
    );
}
