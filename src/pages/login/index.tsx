import React, { ChangeEvent, useState } from 'react'
import { Button, FormControl, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import { Link } from 'react-router-dom';

import './style.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Login() {
  interface user {
    username: String,
    password: String
  }
  const [UserData, setUserData] = useState<user>({ username: '', password: '' })
  const [UserDataErr, setUserDataErr] = useState({ username: false, password: false })
  const [showPassword, setshowPassword] = useState(false)
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
console.log(UserData);

    if (UserData.username === '' || UserData.password === '') {
      setUserDataErr(prev => {
        return {
          ...prev,
          username: UserData.username === '' ? true : false,
          password: UserData.password === '' ? true : false
        }
      })
      return
    }

    setUserDataErr({ username: false, password: false })
  }
  return (
    <div className='login'>
      <div className="heading">
        <h1>Hi</h1>
      </div>
      <form>
        <h3>Login</h3>
        <div className="text-fields">
          &nbsp;
          <span className='username-err-text'>{UserDataErr.username ? 'invalid username' : ''}</span>
          <TextField
            onChange={handleOnchange}
            name="username"
            placeholder='username'
            variant="standard"
            sx={{ mb: '1rem' }} />
          <span className='password-err-text'>{UserDataErr.password ? 'invalid password' : ''}</span>
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
                  {showPassword ? <VisibilityOff sx={{ color: 'rebeccapurple' }} /> : <Visibility sx={{ color: 'rebeccapurple' }} />}
                </IconButton>
              </InputAdornment>
            }
          />

          <FormControl sx={{ pt: '2rem' }}>
            <Link to={'/'}>Forgot password</Link>
            <Button onClick={handleSubmit} variant="contained" sx={{ p: '0.7rem', my: '1rem', backgroundColor: 'rebeccapurple', fontSize: '1rem', fontWeight: '600' }}>Login</Button>
            <Link className="create-account" to={'/'}>I don't have an Account</Link>
          </FormControl>
        </div>
      </form>
    </div>
  )
}

export default Login