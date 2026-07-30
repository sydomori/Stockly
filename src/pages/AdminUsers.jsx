import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '../components/layout/NavBar'
import { getUsers, createUser, updateUser } from '../api/adminUsers'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('user')
    const [tempPassword, setTempPassword] = useState(null)

    function fetchData() {
        getUsers().then(setUsers).catch((err) => setError(err.message))
    }

    useEffect(() => { fetchData() }, [])

    function openCreate() {
        setName(''); setEmail(''); setRole('user'); setTempPassword(null)
        setDialogOpen(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        createUser({ name, email, role })
            .then((response) => {
                setTempPassword(response.temp_password)
                fetchData()
            })
            .catch((err) => setError(err.message))
    }

    function toggleActive(user) {
        updateUser(user.id, { is_active: !user.is_active })
            .then(fetchData)
            .catch((err) => setError(err.message))
    }

    function toggleRole(user) {
        const newRole = user.role === 'admin' ? 'user' : 'admin'
        updateUser(user.id, { role: newRole })
            .then(fetchData)
            .catch((err) => setError(err.message))
    }

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff' }}>Users</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>
                        Add User
                    </Button>
                </Box>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                {users.map((u) => (
                    <Box key={u.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'var(--card-surface)', border: '1px solid var(--border)', borderRadius: 2, p: 2, mb: 1 }}>
                        <Box>
                            <Typography sx={{ color: 'var(--text-primary)' }} fontWeight="bold">{u.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--muted-text)' }}>{u.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip
                                size="small"
                                label={u.role}
                                onClick={() => toggleRole(u)}
                                sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
                                color={u.role === 'admin' ? 'primary' : 'default'}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ color: 'var(--muted-text)' }}>
                                    {u.is_active ? 'Active' : 'Inactive'}
                                </Typography>
                                <Switch checked={u.is_active} onChange={() => toggleActive(u)} size="small" />
                            </Box>
                        </Box>
                    </Box>
                ))}

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: 'var(--card-surface)', color: 'var(--text-primary)' } }}>
                    {tempPassword ? (
                        <Box sx={{ p: 3 }}>
                            <DialogTitle sx={{ p: 0, mb: 2 }}>User Created</DialogTitle>
                            <Typography mb={2}>Share this temporary password with the new employee — it won't be shown again:</Typography>
                            <Box sx={{ bgcolor: 'var(--background)', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '1.1rem', textAlign: 'center' }}>
                                {tempPassword}
                            </Box>
                            <DialogActions sx={{ mt: 2, p: 0 }}>
                                <Button onClick={() => setDialogOpen(false)} variant="contained" sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>Done</Button>
                            </DialogActions>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit}>
                            <DialogTitle>Add User</DialogTitle>
                            <DialogContent>
                                <Stack spacing={2} mt={1}>
                                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" required />
                                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth size="small" required />
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Role</InputLabel>
                                        <Select value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </DialogContent>
                            <DialogActions sx={{ p: 2 }}>
                                <Button onClick={() => setDialogOpen(false)} sx={{ color: 'var(--text-primary)' }}>Cancel</Button>
                                <Button type="submit" variant="contained" sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>Create</Button>
                            </DialogActions>
                        </Box>
                    )}
                </Dialog>
            </Container>
        </>
    )
}