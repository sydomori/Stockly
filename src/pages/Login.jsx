import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useAuth } from '../context/AuthContext'

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setloading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            bgcolor: 'var(--background)',
            borderRadius: 3,
            '& fieldset': { borderColor: 'var(--border)' },
            '&:hover fieldset': { borderColor: 'var(--border)' },
            '&.Mui-focused fieldset': { borderColor: 'var(--primary-action)' },
        },
        '& .MuiInputLabel-root': { color: 'var(--muted-text)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--primary-action)' },
        '& .MuiOutlinedInput-input': { color: 'var(--muted-text)' },
    };

    async function handleSubmit(e){
        e.preventDefault();
        setError('')
        setloading(true)
        try {
            const user = await login (email, password)
            if (user.must_reset_password) {
                navigate('/reset-password')
            } else {
                navigate('/')
            }
        } catch (error) {
            setError (error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'var(--background)'
        }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    bgcolor: 'var(--card-surface)',
                    p: 4,
                    borderRadius: 2,
                    width: '400px',
                    color: 'var(--text-primary)'
                }}
            >
                <Typography variant="h5" mb={1} fontWeight="bold">Stockly</Typography>
                <Typography variant="body2" sx={{ color: 'var(--muted-text)' }} mb={3}>
                    Sign in to manage your inventory
                </Typography>
                <Stack spacing={2}>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        size="small"
                        sx={inputStyles}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        size="small"
                        sx={inputStyles}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)', mt: 1 }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}