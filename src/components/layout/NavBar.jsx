import AppBar from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import logo from '../../assets/logo.svg'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import dashboardLogo from '../../assets/dashboard-logo.svg'
import productsLogo from '../../assets/products-logo.svg'
export default function NavBar(){

    const navigate = useNavigate()
    const navLinks = [
        {name: 'Dashboard', path: '/'},
        {name: 'Products', path: '/products'}
    ]

    return (
        <AppBar position="fixed" sx={{bgcolor:'var(--background)',borderBottom: '2px solid var(--border)'}}>   
            <ToolBar sx={{display: 'flex', justifyContent: 'space-between'}}>
             <Typography variant="h6" fontWeight="bold" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <img src={logo} alt="Stockly" style={{height: 40, borderRadius: '30%'}} />
                Stockly
             </Typography>
             <Box sx={{display: 'flex', gap: 4, ml: 4}}>
                {navLinks.map((link) => (
                    link.name === 'Dashboard' ? (
                    <Button 
                     key={link.name} 
                     color="inherit" 
                     onClick={() => navigate(link.path)}
                     sx={{borderBottom: location.pathname === link.path ? '2px solid white' : '2px solid transparent',
                        borderRadius: 1, transition: 'border-color 0.4s ease-in-out',
                        '&:hover': {
                            borderBottom: '2px solid white',
                            borderRadius: 1,
                            bgcolor: 'transparent'
                        }
                     }}>
                        <img src={dashboardLogo} alt="Dashboard" style={{height: 20}} />
                        {link.name}
                    </Button>
                    ) : (
                    <Button 
                     key={link.name} 
                     color="inherit" 
                     onClick={() => navigate(link.path)}
                     sx={{borderBottom: location.pathname === link.path ? '2px solid white' : '2px solid transparent',
                        borderRadius: 1, transition: 'border-color 0.4s ease-in-out',
                        '&:hover': {
                            borderBottom: '2px solid white',
                            borderRadius: 1,
                            bgcolor: 'transparent'
                        }
                     }}>
                        <img src={productsLogo} alt="Products" style={{height: 20}} />
                        {link.name}
                    </Button>
                    )
                ))}
             </Box>
             <Box sx={{display: 'flex', alignItems: 'center',bgcolor:'var(--card-surface)', borderRadius: 1, px: 1, py: 0.5, width: '400px'}}>
                <SearchIcon sx={{color:'var(--muted-text)',mr:2}} />
                <Input  fullWidth disableUnderline placeholder="Search..." sx={{color:'var(--muted-text)'}} />
             </Box>
           </ToolBar>
        </AppBar>
    )
}
