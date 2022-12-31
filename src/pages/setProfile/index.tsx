import { AccountCircle } from '@mui/icons-material'
import { Avatar, Button, FormControl, Input, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

import './style.scss'

function SetProfile() {
    const [userData, setuserData] = useState({ username: '', about: '', mobile: '' })
    const [userDataErr, setuserDataErr] = useState({ username: false, mobile: false })
    function handleSubmit() {

    }

    function handleOnChange() {
        
    }
    return (
        <div className='set-profile'>
            <div className="set-profile-header">
                <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 100, height: 100 }}
                />
            </div>
            <div className="set-profile-body">
                <form>
                    <div className="text-field">
                        <div className='username-err'>{userDataErr.username ? 'invalid username' : ''}</div>
                        <TextField variant='standard' placeholder="Username" />
                        <TextField variant='standard' placeholder="Email" disabled />
                        <TextField variant='standard' defaultValue="I'm Using HI" placeholder="About" />
                        <div className='mobile-err'>{userDataErr.mobile ? 'invalid Number' : ''}</div>
                        <TextField
                            id="input-with-icon-textfield"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +91
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </div>
                    <FormControl sx={{ m: '1.5rem' }}>
                        <Button variant="outlined">Continue</Button>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}

export default SetProfile