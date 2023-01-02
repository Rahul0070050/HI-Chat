import { ChatRounded } from '@mui/icons-material'
import React from 'react'
import ChatListItem from '../../components/chat-list'

import './style.scss'

function Chat() {
  return (
    <div className='chat-list'>
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <ChatListItem />
      <div className="sent-btn">
        <ChatRounded />
      </div>
    </div>
  )
}

export default Chat
