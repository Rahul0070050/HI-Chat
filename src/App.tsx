import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import './App.scss';
import Home from './pages/home';
import Login from './pages/login';
import SetProfile from './pages/setProfile';
import SignIn from './pages/signin';
import Chat from './pages/chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<Chat />} />
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/set-profile' element={<SetProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
