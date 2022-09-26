import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'App.css';
import Navigation from 'components/Navigation/Navigation';
import GlobalStyle from 'theme/globalStyles';
import Home from 'pages/Home/Home';
//import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
