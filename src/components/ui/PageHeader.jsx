import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import DownloadIcon from '@mui/icons-material/Download'
import Stack from '@mui/material/Stack'
import "../../App.css"

export default function PageHeader(){
    return(
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, position: 'relative', top: '80px'}}>
            <Stack spacing={0.5}>
                <Typography sx={{color: 'var(--text-primary)'}} variant="h4" fontWeight="bold">
                    Products
                </Typography>
                <Typography sx={{color: 'var(--text-primary)'}} variant="body3">
                    Manage your inventory and add new products to your catalog
                </Typography>
            </Stack>
            <Box sx={{display: 'flex', gap: 2}}>
                <Button startIcon={<FilterListIcon />} variant="outlined" sx={{color: 'var(--text-primary)', border: '2px solid var(--border)'}}>Filter</Button>
                <Button startIcon={<DownloadIcon />} variant="outlined" sx={{color: 'var(--text-primary)', border: '2px solid var(--border)'}}>Export</Button>
            </Box>
        </Box>
    )
}