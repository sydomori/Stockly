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
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '../components/layout/NavBar'
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../api/suppliers'

export default function AdminSuppliers() {
    const [suppliers, setSuppliers] = useState([])
    const [error, setError] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [name, setName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [phone, setPhone] = useState('')

    function fetchData() {
        getSuppliers().then(setSuppliers).catch((err) => setError(err.message))
    }

    useEffect(() => { fetchData() }, [])

    function openCreate() {
        setEditing(null)
        setName(''); setContactEmail(''); setPhone('')
        setDialogOpen(true)
    }

    function openEdit(supplier) {
        setEditing(supplier)
        setName(supplier.name)
        setContactEmail(supplier.contact_email || '')
        setPhone(supplier.phone || '')
        setDialogOpen(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = { name, contact_email: contactEmail, phone }
        const action = editing ? updateSupplier(editing.id, data) : createSupplier(data)
        action
            .then(() => { fetchData(); setDialogOpen(false) })
            .catch((err) => setError(err.message))
    }

    function handleDelete(id) {
        deleteSupplier(id).then(fetchData).catch((err) => setError(err.message))
    }

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff' }}>Suppliers</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>
                        Add Supplier
                    </Button>
                </Box>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                {suppliers.map((s) => (
                    <Box key={s.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'var(--card-surface)', border: '1px solid var(--border)', borderRadius: 2, p: 2, mb: 1 }}>
                        <Box>
                            <Typography sx={{ color: 'var(--text-primary)' }} fontWeight="bold">{s.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--muted-text)' }}>{s.contact_email} {s.phone && `· ${s.phone}`}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => openEdit(s)} sx={{ color: 'var(--text-primary)' }}><EditIcon fontSize="small" /></IconButton>
                            <IconButton onClick={() => handleDelete(s.id)} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                    </Box>
                ))}

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: 'var(--card-surface)', color: 'var(--text-primary)' } }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogTitle>{editing ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2} mt={1}>
                                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" required />
                                <TextField label="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} fullWidth size="small" />
                                <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth size="small" />
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setDialogOpen(false)} sx={{ color: 'var(--text-primary)' }}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>
                                {editing ? 'Save' : 'Add'}
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>
        </>
    )
}