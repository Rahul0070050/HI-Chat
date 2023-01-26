import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom';
import { PersonAdd, Search } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/footer';
import ChatWindow from '../../components/chatWindow';
import { reduxGlobal } from '../../../types';
import { showAddPersonModalWindow } from '../../redux/global';
import AddContact from '../../components/addContact';

import './style.scss'

function Home() {
    const dispatch = useDispatch()
    const {selectedWindow} = useSelector((state:reduxGlobal) => state.global)
    return (
        <div className='home'>
            <ChatWindow />
            <AddContact />
            <Paper className='header'>
                <div className="top">
                    <Typography className='logo'>{selectedWindow}</Typography>
                    <div className="options">
                        {selectedWindow === 'contacts' ? <PersonAdd sx={{ mr: '1rem' }} onClick={() => dispatch(showAddPersonModalWindow(true))} /> : null}
                        {selectedWindow !== 'profile' && <Search sx={{ mr: '1rem' }} />}
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
