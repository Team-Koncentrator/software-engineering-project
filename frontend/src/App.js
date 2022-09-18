import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Button from './components/Button/Button';

function App() {
  return (
    <div>
      <header>
        <h1>Welcome to React Router!</h1>
        <Button name='click'>Clikck</Button>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
