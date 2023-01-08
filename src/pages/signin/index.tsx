import React, { ChangeEvent, useState } from 'react'
import { Button, Card, FormControl, IconButton, Input, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { userSignIn } from '../../firebase/config';



import './style.scss'

function Login() {
  const location = useNavigate()

  interface user {
    email: String,
    password: String
  }
  const [UserData, setUserData] = useState<user>({ email: '', password: '' })
  const [UserDataErr, setUserDataErr] = useState({ email: false, password: false })
  const [showPassword, setshowPassword] = useState(false)
  const [authErr, setAuthErr] = useState('')


  function handleOnchange(e: ChangeEvent<HTMLInputElement>) {

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

    setUserDataErr({ email: false, password: false })
    
    
    userSignIn(UserData.email, UserData.password).then(user => {
      
      console.log(user);
      location('/set-profile')
      
    }).catch(error => {
      setAuthErr(error)
    })

  }
  return (
    <div className='login'>
      <div className="login-app-logo">
        <h1>Hi</h1>
      </div>
      <form>
        <h3>Sign In</h3>
        <div className="text-fields">
          &nbsp;
          <span className='username-err-text'>{UserDataErr.email ? 'invalid email' : ''}</span>
          <TextField
            onChange={handleOnchange}
            name="email"
            placeholder='email'
            variant="standard"
            type='email'
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
            <Link className="create-account" to={'/signup'}>I don't have an Account</Link>
          </FormControl>
        </div>
      </form>
      <div className="error-box">
        <Card className={`error ${authErr && 'show-err'}`}>{authErr}</Card>
      </div>
    </div>
  )
}

export default Login