import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import DownloadIcon from '@mui/icons-material/Download'
import Stack from '@mui/material/Stack'
import "../../App.css"
import addCircle from '../../assets/addCircle.svg'


export default function PageHeader({filterOpen, setFilterOpen, isAddingProduct, onToggleAdd}){
    return(
        <Box sx={{display: 'flex',flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', mb: 2, position: 'relative', top: '70px'}}>
            <Stack direction="row" spacing={2} sx={{width: '100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Stack spacing={0.5}>
                    <Typography sx={{color: 'var(--text-primary)'}} variant="h4" fontWeight="bold">
                        Products
                    </Typography>
                    <Typography sx={{color: 'var(--text-primary)'}} variant="body3">
                        Manage your inventory and add new products to your catalog
                    </Typography>
                </Stack>
                <Box sx={{display: 'flex', gap: 2}}>
                    <Button startIcon={<FilterListIcon />} variant="text" sx={{color: 'var(--text-primary)', '&:hover': {bgcolor: 'var(--primary-action)',color:'var(--background)'}}} onClick={() => setFilterOpen(!filterOpen)}>Filter</Button>
                    <Button startIcon={<DownloadIcon />} variant="text" sx={{color: 'var(--text-primary)', '&:hover': {bgcolor: 'var(--primary-action)',color:'var(--background)'}}}>Export</Button>
                </Box>
            </Stack>
            
            <Box sx={{mt:4, display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
                <Button onClick={onToggleAdd} sx={{borderColor: 'var(--border)', bgcolor: 'var(--card-surface)', color: 'var(--text-primary)', '&:hover': {bgcolor: 'var(--primary-action-hover)'}}} variant="outlined" startIcon={<AddIcon />}>
                    {isAddingProduct ? 'Cancel' : 'Add Product'}
                </Button>
            </Box>
        </Box>          
    )
}

function AddIcon(){
    return(
        <img style={{width: 24, height: 24}} src={addCircle} alt="Add" />
    )
}