import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import NavBar from '../components/layout/NavBar'
import { getMyActivity } from '../api/activityLog'

const actionColors = {
    created: 'success',
    updated: 'info',
    deleted: 'error',
}

export default function MyActivity() {
    const [logs, setLogs] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        getMyActivity()
            .then(setLogs)
            .catch((err) => setError(err.message))
    }, [])

    return (
        <>
            <NavBar />
            <Container sx={{ mt: 12, pb: 4 }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#ffffff', mb: 3 }}>
                    My Activity
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                {logs.length === 0 && !error && (
                    <Typography sx={{ color: 'var(--muted-text)' }}>No activity yet.</Typography>
                )}
                {logs.map((log) => (
                    <Box
                        key={log.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            bgcolor: 'var(--card-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 2,
                            p: 2,
                            mb: 1
                        }}
                    >
                        <Box>
                            <Chip
                                size="small"
                                label={log.action}
                                color={actionColors[log.action] || 'default'}
                                sx={{ mr: 2, textTransform: 'capitalize' }}
                            />
                            <Typography component="span" sx={{ color: 'var(--text-primary)' }}>
                                {log.details}
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