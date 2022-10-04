import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'App.css';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import GlobalStyle from 'theme/globalStyles';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import Faq from 'pages/Faq/Faq';
import Authors from 'pages/Authors/Authors';
import Assign from 'pages/Assign/Assign';
import Allocation from 'pages/Allocation/Allocation';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navigation />
      <div className='app-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='faq' element={<Faq />} />
          <Route path='authors' element={<Authors />} />
          <Route path='allocation' element={<Allocation />} />
          <Route path='assign' element={<Assign />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
