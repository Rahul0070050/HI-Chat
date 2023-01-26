import React, { useEffect, useState } from 'react'
import { QuestionAnswer, ViewCarousel, CameraAlt, AccountCircle, Person2, Contacts } from '@mui/icons-material';
import { Avatar, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/global';
import { setUser } from '../../redux/user';
import { auth } from '../../firebase/config';
import { reduxGlobal } from '../../../types';

function Footer() {
    const location = useLocation()
    const [iconSelected, setIconSelected] = useState(`chat`)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { photoURL, displayName } = useSelector((state: reduxGlobal) => state.user)
    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user: any) => {
            if (!user) {
                navigate('/signin')
            }
            dispatch(setUser({
                displayName: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid
            }))
        })

        navigate('/')

        return () => {
            unSub()
        }
    }, [])

    function navigateHandler(path: string) {
        setIconSelected(path)
        if (path === 'chat') {
            dispatch(setLocation('chats'))
            navigate(`/`)
        } else {
            dispatch(setLocation(`${path}`))
            navigate(`/${path}`)
        }
    }
    return (
        <div className="footer">
            <Paper className='action-bar'>
                <Contacts onClick={() => navigateHandler('contacts')} className={`${iconSelected === 'contacts' ? 'icon-selected' : ''}`} />
                <CameraAlt onClick={() => navigateHandler('camera')} className={`${iconSelected === 'camera' ? 'icon-selected' : ''}`} />
                <QuestionAnswer onClick={() => navigateHandler('chat')} className={`${iconSelected === 'chat' ? 'icon-selected' : ''}`} />
                <ViewCarousel onClick={() => navigateHandler('images')} className={`${iconSelected === 'images' ? 'icon-selected' : ''}`} />
                {
                    photoURL !== '' ?
                        <Avatar onClick={() => navigateHandler('profile')} alt={displayName} className={`avatar-profile ${iconSelected === 'profile' ? 'icon-selected' : ''}`} src={photoURL} />
                        :
                        <Person2 onClick={() => navigateHandler('profile')} className={`${iconSelected === 'profile' ? 'icon-selected' : ''}`} />
                }
            </Paper>
        </div>
    )
}

export default Footer