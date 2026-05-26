import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import NavBar from '../components/layout/NavBar'
import PageHeader from '../components/ui/PageHeader'
import { useState } from 'react'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function Dashboard() {
    const [open, setOpen] = useState(false)
    return (
        <Container>
            <NavBar />
            <PageHeader filterOpen={open} setFilterOpen={setOpen} />
            <Collapse in={open} sx={{mt: 6.5, ml:73}}>
                <Box sx={{display: 'flex', gap: 2, mt: 2, p: 2, bgcolor: 'var(--primary-action)', borderRadius: 1, width: '300px'}}>
                        <Select size="small" defaultValue="all" sx={{width: '200px'}}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="audio">Audio</MenuItem>
                            <MenuItem value="footwear">Footwear</MenuItem>
                            <MenuItem value="wearables">Wearables</MenuItem>
                            <MenuItem value="cameras">Cameras</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                        </Select>

                        <Select size="small" defaultValue="all" sx={{minWidth: 150}}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="in_stock">In Stock</MenuItem>
                            <MenuItem value="low_stock">Low Stock</MenuItem>
                            <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                        </Select>
                </Box>
            </Collapse>
        </Container>
    )
}