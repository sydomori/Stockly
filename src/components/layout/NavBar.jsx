import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import logo from '../../assets/logo.svg'
import '../../App.css'
import { useNavigate, useLocation } from 'react-router-dom'
import dashboardLogo from '../../assets/dashboard-logo.svg'
import productsLogo from '../../assets/products-logo.svg'
import HistoryIcon from '@mui/icons-material/History'
import PeopleIcon from '@mui/icons-material/People'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import CategoryIcon from '@mui/icons-material/Category'
import { useAuth } from '../../context/AuthContext'

export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isAdmin, logout } = useAuth()

    const navLinks = [
        { name: 'Dashboard', path: '/', icon: dashboardLogo },
        { name: 'Products', path: '/products', icon: productsLogo },
        { name: 'My Activity', path: '/my-activity', icon: HistoryIcon },
    ]

    const adminLinks = [
        { name: 'Users', path: '/admin/users', icon: PeopleIcon },
        { name: 'Suppliers', path: '/admin/suppliers', icon: LocalShippingIcon },
        { name: 'Categories', path: '/admin/categories', icon: CategoryIcon },
        { name: 'Activity Log', path: '/admin/activity-log', icon: HistoryIcon },
    ]

    const linksToShow = isAdmin ? [...navLinks, ...adminLinks] : navLinks

    function handleLogout() {
        logout()
        navigate('/login')
    }

    function renderIcon(icon) {
        if (typeof icon === 'string') {
            return <img src={icon} alt="" style={{ height: 20 }} />
        }
        const IconComponent = icon
        return <IconComponent sx={{ fontSize: 20 }} />
    }

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'var(--background)', borderBottom: '2px solid var(--border)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={logo} alt="Stockly" style={{ height: 40, borderRadius: '30%' }} />
                    Stockly
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, ml: 4, overflowX: 'auto' }}>
                    {linksToShow.map((link) => (
                        <Button
                            key={link.name}
                            color="inherit"
                            onClick={() => navigate(link.path)}
                            startIcon={renderIcon(link.icon)}
                            sx={{
                                borderBottom: location.pathname === link.path ? '2px solid white' : '2px solid transparent',
                                borderRadius: 1,
                                transition: 'border-color 0.2s ease-in-out',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                    borderBottom: '2px solid white',
                                    borderRadius: 1,
                                    bgcolor: 'transparent'
                                }
                            }}
                        >
                            {link.name}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'var(--muted-text)' }}>
                        {user?.name}
                    </Typography>
                    <IconButton onClick={handleLogout} sx={{ color: 'var(--text-primary)' }} title="Log out">
                        <LogoutIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Toolbar>
            
        </AppBar>
    )
}