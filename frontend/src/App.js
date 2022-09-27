import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'App.css';
import Navigation from 'components/Navigation/Navigation';
import GlobalStyle from 'theme/globalStyles';
import Home from 'pages/Home/Home';
//import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Faq from 'pages/Faq/Faq';
import Authors from 'pages/Authors/Authors';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
<<<<<<< HEAD
        <Route path='login' element={<Register />} />
=======
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='faq' element={<Faq />} />
        <Route path='authors' element={<Authors />} />
>>>>>>> work
      </Routes>
    </>
  );
}

export default App;
