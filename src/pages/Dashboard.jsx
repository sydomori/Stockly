import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import NavBar from '../components/layout/NavBar'

export default function Dashboard() {
    return (
        <Container>
            <NavBar />
            <Typography variant="h4" fontWeight="bold">
                Dashboard
            </Typography>
        </Container>
    )
}