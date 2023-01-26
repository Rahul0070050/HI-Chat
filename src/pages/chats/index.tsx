import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import { ChatRounded } from '@mui/icons-material'

import ChatListItem from '../../components/chat-list'
import { useSelector } from 'react-redux'
import { reduxGlobal } from '../../../types'

import './style.scss'
import { openChatWindo } from '../../redux/global'

function Chat() {
  const {showChatWindow} = useSelector((state:reduxGlobal) => state.global)
  return (
    <>
      <div className='chat-list' style={{height: `${window.innerHeight - 115}px`}}>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
        <ChatListItem personClickHandle={openChatWindo}/>
      </div>
    </>
  )
}

export default Chat
