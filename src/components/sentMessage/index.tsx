import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'

import './style.scss';

function SentMessage() {
  return (
    <div className='sent-message'>
        <input placeholder='Type Here' type="text" id="" />
        <Send sx={{padding: '0.8rem'}} className='btn'/>
    </div>
  )
}

export default SentMessage