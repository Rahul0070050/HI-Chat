import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import './App.scss';
import Login from './pages/login';
import SignIn from './pages/signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
