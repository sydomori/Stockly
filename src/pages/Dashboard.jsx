import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import NavBar from '../components/layout/NavBar'
import PageHeader from '../components/ui/PageHeader'

export default function Dashboard() {
    return (
        <Container>
            <NavBar />
            <PageHeader />
        </Container>
    )
}