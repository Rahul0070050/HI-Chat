import React from 'react'
import ChatListItem from '../../components/chat-list';
import { showFriendProfile } from '../../redux/global';

import './style.scss';

function Contacts() {
  return (
    <div className='contact-list' style={{height: `${window.innerHeight - 115}px`}}>
        <ChatListItem personClickHandle={showFriendProfile}/>
    </div>
  )
}

export default Contacts
