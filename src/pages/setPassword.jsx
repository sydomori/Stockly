import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { setPassword as apiSetPassword } from '../api/auth'
import { useAuth } from '../context/AuthContext'

export default function SetPassword (){
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {user, logout} = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        setError('')
        setLoading(true)

        try {
          await apiSetPassword(user.email, currentPassword, newPassword)
          logout()
          navigate('/login')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--background)' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'var(--card-surface)', p: 4, borderRadius: 2, width: '400px', color: 'var(--text-primary)' }}>
                <Typography variant="h5" mb={1} fontWeight="bold">Set New Password</Typography>
                <Typography variant="body2" sx={{ color: 'var(--muted-text)' }} mb={3}>
                    Please set a new password to continue.
                </Typography>
                <Stack spacing={2}>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                    <TextField label="Current (Temp) Password" type="password" fullWidth size="small" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    <TextField label="New Password" type="password" fullWidth size="small" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)', mt: 1 }}>
                        {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}