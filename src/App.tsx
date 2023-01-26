import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import './App.scss';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import SetProfile from './pages/setProfile';
import Chat from './pages/chats'
import PageNotFound from './pages/underConstructionPage';
import Contacts from './pages/contacts';
import Profile from './pages/profile';






function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<Chat />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/camera' element={<PageNotFound />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/images' element={<PageNotFound />} />
        </Route>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/set-profile' element={<SetProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
