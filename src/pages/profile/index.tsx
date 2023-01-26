import { Edit } from '@mui/icons-material';
import { Card, IconButton, Paper, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { reduxGlobal } from '../../../types';

import './style.scss';

function Profile() {
    const { displayName, photoURL, email, phoneNumber, uid } = useSelector((state: reduxGlobal) => state.user)
    return (
        <div className='profile' style={{ height: `${window.innerHeight - 115}px` }}>
            <div className="image">
                <img src={photoURL} alt={displayName} />
                <Typography>{displayName} <IconButton><Edit sx={{fontSize: '1rem'}}/></IconButton></Typography>
            </div>
            <div className="user-profile-info">
                {/* <Typography sx={{ padding: '1rem', fontWeight: '700' }} variant="h6">Options</Typography> */}
                <Paper sx={{ fontSize: '1.2rem' }}>friend requests</Paper>
                <Paper sx={{ fontSize: '1.2rem' }}>settings</Paper>
                <Paper sx={{ fontSize: '1.2rem' }}>help</Paper>
                <Paper sx={{ fontSize: '1.2rem' }}>report</Paper>
                <Paper sx={{ fontSize: '1.2rem' }}>LogOut</Paper>
            </div>
        </div>
    )
}

export default Profile