import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'
import DownloadIcon from '@mui/icons-material/Download'

export default function PageHeader(){
    return(
        <Box>
            <Stack>
                <Typography variant="h4" fontWeight="bold">
                    Products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage your products
                </Typography>
            </Stack>
            <Box>
                <Button startIcon={<FilterListIcon />} variant="outlined">Filter</Button>
                <Button startIcon={<DownloadIcon />} variant="outlined">Export</Button>
            </Box>
        </Box>
    )
}