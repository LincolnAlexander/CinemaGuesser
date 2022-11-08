import React from 'react';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import PrivateComponent from './components/PrivateComponent';

function CinemaGuesserApp() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Add more private paths here */}
        <Route element={<PrivateComponent />}>
          <Route path='/game' element={<GamePage />} />
          <Route path='/home' element={<HomePage />} />
        </Route>

        {/* Public paths */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        {/* For unknown path*/}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default CinemaGuesserApp;
