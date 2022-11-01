import React from 'react';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';

function CinemaGuesserApp() {
  return (
    <>
      <Nav />
      <Routes>
        {/* Add more paths here */}
        <Route path='/' element={<LoginPage />} />

        {/* For unknown path go to login page*/}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default CinemaGuesserApp;
