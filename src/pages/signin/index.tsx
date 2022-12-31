import React, { ChangeEvent, useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';

import { auth, userSignIn } from '../../firebase/config';

import './style.scss'

function SignIn() {
  const location = useNavigate()


  const [UserData, setUserData] = useState<user>({ email: '', password: '' })
  const [UserDataErr, setUserDataErr] = useState({ email: false, password: false })
  const [showPassword, setshowPassword] = useState(false)

  interface user {
    email: String,
    password: String
  }


  function handleOnchange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);

    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit() {

    if (UserData.email === '' || UserData.password === '') {
      setUserDataErr(prev => {
        return {
          ...prev,
          email: UserData.email === '' ? true : false,
          password: UserData.password === '' ? true : false
        }
      })
      return
    }

    userSignIn(UserData.email,UserData.password).then(user => {
      location('/set-profile')
    })
  }

  return (
    <div className='sign-in'>
      <div className="login-app-logo">
        <h1>Hi</h1>
      </div>
      <div className="text-fields">
        <h1 className='sign-in-text'><strong>Sign In</strong></h1>
        <form>
          <div className='email-err-text'>{UserDataErr.email ? 'invalid email' : ''}</div>
          <TextField
            onChange={handleOnchange}
            name="email"
            placeholder='email'
            variant="standard"
            sx={{ mb: '1rem' }} />
          <div className='password-err-text'>{UserDataErr.password ? 'invalid password' : ''}</div>
          <Input
            placeholder='password'
            type={showPassword ? 'text' : 'password'}
            onChange={handleOnchange}
            name='password'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility sx={{ color: 'rebeccapurple' }} /> : <VisibilityOff sx={{ color: 'rebeccapurple' }} />}
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
        <FormControl sx={{ px: '2rem', display: 'flex' }}>
          <Button onClick={handleSubmit} type='button' variant="contained" sx={{ p: '0.7rem', my: '1rem', backgroundColor: 'rebeccapurple', fontSize: '1rem', fontWeight: '600' }}>Login</Button>
          <div className="sign-in-links">
            <Link to='/login' >I Have an Account</Link>
          </div>
        </FormControl>
      </div>
    </div>
  )
}

export default SignIn
