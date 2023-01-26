import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, Typography } from '@mui/material';
import { QrCode, ArrowBack } from '@mui/icons-material';
import QRCode from "react-qr-code";
import QrReader from 'modern-react-qr-reader'

import { reduxGlobal, searchProfile } from '../../../types';
import { showAddPersonModalWindow } from '../../redux/global';

import { cancelFriendRequest, findUserInfo, sendFriendRequest } from '../../firebase/config';
import './style.scss';

type personType = {
    displayName: string,
    about: string,
    email: string,
    phoneNumber: string,
    photoURL: string,
    uid: string,
    following: "Requested" | "Following" | "Request"
}
function AddContact() {
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    const [scan, setScan] = useState(false)
    const [frond, setfrond] = useState(false)
    const [person, setPerson] = useState<searchProfile | null>()

    const { global: { showAddPersonModal }, user: { uid } } = useSelector((state: reduxGlobal) => state)

    function handleScan(result: any) {
        if (result && data === null) {
            console.log(result);

            setData(result)

            findUserInfo(result).then((person: any) => {
                if (person.status === 'invalid qr code') {
                    setData(null)
                } else {
                    setPerson({ ...person, uid: result?.text })
                }
            }).catch(err => {
                setData(null)
                return;
            })
        }
    }

    function resetScanner() {
        setData(null)
        setPerson((prev) => {
            return {
                ...prev,
                about: '',
                displayName: '',
                email: '',
                phoneNumber: '',
                photoURL: '',
            }
        })
    }

    function handleError(e: any) {
        console.log(e);
    }

    function friendRequestHandler() {
        sendFriendRequest({ displayName: `${person?.displayName}`, photoURL: `${person?.photoURL}`, uid: `${data}` })
    }

    function cancelRequestHandler() {
        cancelFriendRequest()
    }

    function friendUnFollowHandler() {
        
    }
    return (
        <div className={`${showAddPersonModal ? 'show-add-person-modal' : ''} add-person-modal`}>
            <div className="back-arrow">
                <IconButton onClick={() => {
                    dispatch(showAddPersonModalWindow(false))
                    setTimeout(() => {

                        setScan(false)
                        resetScanner()
                    }, 1000)
                }}>
                    <ArrowBack />
                </IconButton>
            </div>
            {
                (data && person) ? <>
                    <div className="profile-view">
                        <div className="image">
                            <img src={person.photoURL} alt="" />
                        </div>
                        <div className="info">
                            <Typography>{person.displayName}</Typography>
                            <Typography>{person.about}</Typography>
                            <div className="more-info">
                                <div className="following">
                                    <Typography className='following-heading'>friends</Typography>
                                    <Typography>{person.friends}</Typography>
                                </div>
                            </div>
                            <div className="profile-btns">
                                {person.friend ?
                                    <div>
                                        <Button variant='outlined' sx={{ color: 'blue', borderColor: 'blue' }} onClick={() => {
                                            resetScanner()
                                        }} >Try Again</Button>
                                        <Button variant='contained' sx={{ backgroundColor: 'red' }} onClick={friendUnFollowHandler}>UnFollow</Button>
                                    </div>
                                    :
                                    <div>
                                        <Button variant='outlined' sx={{ color: 'blue', borderColor: 'blue' }} onClick={() => {
                                            resetScanner()
                                        }}>Try Again</Button>
                                        {person.requested ?
                                            <Button variant='contained' sx={{ backgroundColor: '#055ade' }} onClick={cancelRequestHandler}>pending</Button>
                                            :
                                            <Button variant='contained' sx={{ backgroundColor: '#055ade' }} onClick={friendRequestHandler}>follow</Button>
                                        }
                                    </div>}
                            </div>
                        </div>
                    </div>
                </> : <>
                    <div className="qr-code">
                        {scan ?
                            <QrReader
                                delay={300}
                                facingMode={frond ? "user" : "environment"}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '18rem', height: '18rem' }}
                            />
                            :
                            <QRCode
                                size={256}
                                value={`${uid}`}
                                viewBox={`0 0 256 256`}
                                style={{ boxShadow: '3px 3px 10px 2px black' }}
                            />
                        }
                    </div>
                </>
            }
            <div className="btns">
                {(person && data) ?
                    <>
                        {null}
                    </>
                    :
                    <>
                        {scan ?
                            <div>
                                <Button onClick={() => {
                                    setScan(false)
                                    setData(null)
                                }} variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>QR Code</Button>
                                <Button onClick={() => setfrond(!frond)} variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Switch Camera</Button>
                            </div>
                            :
                            <Button onClick={() => setScan(true)} variant='outlined' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><QrCode />Scan</Button>
                        }
                    </>
                }
            </div>
        </div >
    )
}

export default AddContact