import React from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'

import ChatNav from '../chatNav'
import Conversation from '../conversation'
import { reduxGlobal } from '../../../types'

import './style.scss'
import SentMessage from '../sentMessage'

function ChatWindow() {
    const { showChatWindow } = useSelector((state: reduxGlobal) => state.global)
    
    return (
        <Paper className={`chat-window ${showChatWindow ? 'show-chat-window' : ''}`}>
            <ChatNav />
            <Conversation />
            <SentMessage />
        </Paper>
    )
}

export default ChatWindow