import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import logo from '../../assets/logo.svg'
import '../../App.css'
export default function NavBar(){
    return (
        <AppBar position="fixed" sx={{bgcolor:'var(--background)'}}>   
            <ToolBar sx={{display: 'flex', justifyContent: 'space-between'}}>
             <Typography variant="h6" fontWeight="bold" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <img src={logo} alt="Stockly" style={{height: 40, borderRadius: '30%'}} />
                Stockly
             </Typography>
             <Box sx={{display: 'flex', gap: 4, ml: 4}}>
                <Button  color="inherit">Dashboard</Button>
                <Button color="inherit">Products</Button>
             </Box>
             <Box sx={{display: 'flex', alignItems: 'center',bgcolor:'var(--card-surface)', borderRadius: 1, px: 1, py: 0.5, width: '400px'}}>
                <SearchIcon sx={{color:'var(--muted-text)',mr:2}} />
                <Input fullWidth disableUnderline placeholder="Search..." sx={{color:'var(--muted-text)'}} />
             </Box>
           </ToolBar>
        </AppBar>
    )
}
