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
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories'

export default function AdminCategories() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function fetchData() {
        getCategories().then(setCategories).catch((err) => setError(err.message))
    }

    useEffect(() => { fetchData() }, [])

    function openCreate() {
        setEditing(null)
        setName('')
        setDescription('')
        setDialogOpen(true)
    }

    function openEdit(category) {
        setEditing(category)
        setName(category.name)
        setDescription(category.description || '')
        setDialogOpen(true)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = { name, description }
        const action = editing ? updateCategory(editing.id, data) : createCategory(data)
        action
            .then(() => { fetchData(); setDialogOpen(false) })
            .catch((err) => setError(err.message))
    }

    function handleDelete(id) {
        deleteCategory(id)
            .then(fetchData)
            .catch((err) => setError(err.message))
    }

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff' }}>Categories</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate} sx={{ bgcolor: 'var(--primary-action)', color: 'var(--background)' }}>
                        Add Category
                    </Button>
                </Box>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                {categories.map((cat) => (
                    <Box key={cat.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'var(--card-surface)', border: '1px solid var(--border)', borderRadius: 2, p: 2, mb: 1 }}>
                        <Box>
                            <Typography sx={{ color: 'var(--text-primary)' }} fontWeight="bold">{cat.name}</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--muted-text)' }}>{cat.description}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => openEdit(cat)} sx={{ color: 'var(--text-primary)' }}><EditIcon fontSize="small" /></IconButton>
                            <IconButton onClick={() => handleDelete(cat.id)} sx={{ color: 'error.main' }}><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                    </Box>
                ))}

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: 'var(--card-surface)', color: 'var(--text-primary)' } }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogTitle>{editing ? 'Edit Category' : 'Add Category'}</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2} mt={1}>
                                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth size="small" required />
                                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth size="small" multiline rows={3} />
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