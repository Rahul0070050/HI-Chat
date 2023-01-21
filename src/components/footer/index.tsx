import React, { useState } from 'react'
import { QuestionAnswer, ViewCarousel, CameraAlt, AccountCircle, Person2, Contacts } from '@mui/icons-material';
import { Paper } from '@mui/material';

import './style.scss'

function Footer() {
    const [iconSelected, setIconSelected] = useState('chat')
    return (
        <div className="footer">
            <Paper className='action-bar'>
                <Contacts onClick={() => setIconSelected('contacts')} className={`${iconSelected === 'contacts' ? 'icon-selected' : ''}`} />
                <CameraAlt onClick={() => setIconSelected('camera')} className={`${iconSelected === 'camera' ? 'icon-selected' : ''}`} />
                <QuestionAnswer onClick={() => setIconSelected('chat')} className={`${iconSelected === 'chat' ? 'icon-selected' : ''}`} />
                <ViewCarousel onClick={() => setIconSelected('images')} className={`${iconSelected === 'images' ? 'icon-selected' : ''}`} />
                <Person2 onClick={() => setIconSelected('profile')} className={`${iconSelected === 'profile' ? 'icon-selected' : ''}`} />
            </Paper>
        </div>
    )
}

export default Footer