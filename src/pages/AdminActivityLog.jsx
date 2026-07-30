import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import NavBar from '../components/layout/NavBar'
import { getAllActivity } from '../api/activityLog'

const actionColors = { created: 'success', updated: 'info', deleted: 'error' }

export default function AdminActivityLog() {
    const [logs, setLogs] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getAllActivity().then(setLogs).catch((err) => setError(err.message))
    }, [])

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff', mb: 3 }}>Activity Log</Typography>
                {error && <Typography color="error">{error}</Typography>}
                {logs.map((log) => (
                    <Box key={log.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'var(--card-surface)', border: '1px solid var(--border)', borderRadius: 2, p: 2, mb: 1 }}>
                        <Box>
                            <Chip size="small" label={log.action} color={actionColors[log.action] || 'default'} sx={{ mr: 2, textTransform: 'capitalize' }} />
                            <Typography component="span" sx={{ color: 'var(--text-primary)' }}>{log.details}</Typography>
                            <Typography variant="caption" sx={{ color: 'var(--muted-text)', display: 'block', mt: 0.5 }}>
                                User ID: {log.user_id}
                            </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'var(--muted-text)' }}>
                            {new Date(log.timestamp).toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Container>
        </>
    )
}