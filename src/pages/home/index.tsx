import React, { useEffect } from 'react'

import { Paper, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { QuestionAnswer, Search, ViewCarousel, CameraAlt, AccountCircle } from '@mui/icons-material';

import Footer from '../../components/footer';

import './style.scss'

function Home() {
    return (
        <div className='home'>
            <Paper className='header'>
                <div className="top">
                    <Typography className='logo'>Chats</Typography>
                    <div className="options">
                        <Search sx={{ mr: '1rem' }} />
                    </div>
                </div>
            </Paper>
            <Paper className='home-content'>
                <Outlet />
            </Paper>
            <Footer />
        </div>
    )
}

export default Home
