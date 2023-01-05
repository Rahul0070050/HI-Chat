import React from 'react'
import { Paper, Typography } from '@mui/material'
import { MoreVertRounded, QrCode2 } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';

import './style.scss'

function Home() {
    return (
        <div className='home'>
            <Paper className='header'>
                <div className="top">
                    <Typography className='logo'>HI</Typography>
                    <div className="options">
                        <QrCode2 sx={{ mr: '0.8rem' }} />
                        <MoreVertRounded sx={{ mr: '1rem' }} />
                    </div>
                </div>
                <div className="bottom">
                    <NavLink to="/">Chat</NavLink>
                    <NavLink to="/status">Status</NavLink>
                    <NavLink to="/calls">Calls</NavLink>
                </div>
            </Paper>
            <Paper className='chat-list'>
                <Outlet />
            </Paper>
        </div>
    )
}

export default Home
