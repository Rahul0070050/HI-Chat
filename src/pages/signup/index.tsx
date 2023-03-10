import React, { ChangeEvent, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Card, FormControl, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { userSignUp } from '../../firebase/config';

import './style.scss'

function SingUp() {
  const location = useNavigate()

  const [UserData, setUserData] = useState<user>({ email: '', password: '' })
  const [UserDataErr, setUserDataErr] = useState({ email: false, password: false })
  const [showPassword, setshowPassword] = useState(false)
  const [authErr, setAuthErr] = useState('')

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

    userSignUp(UserData.email, UserData.password).then(user => {
      location('/set-profile')
    }).catch(err => {
      setAuthErr(err)
    })
  }

  return (
    <div className='sign-in'>
      <div className="login-app-logo">
        <h1>Hi</h1>
      </div>
      <div className="text-fields">
        <h1 className='sign-in-text'><strong>Sign Up</strong></h1>
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
            <Link to='/signin' >I Have an Account</Link>
          </div>
        </FormControl>
      </div>
      <div className="error-box">
        <Card className={`error ${authErr && 'show-err'}`}>{authErr}</Card>
      </div>
    </div>
  )
}

export default SingUp
