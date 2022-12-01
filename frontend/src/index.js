import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CinemaGuesserApp from './CinemaGuesserApp';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import GamePage from './pages/GamePage';
import Nav from './components/Nav';
import LeaderboardPage from './pages/LeaderboardPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import EmailCheck from './pages/EmailCheck';
import RegistrationSuccess from './components/RegistrationSuccess';
import UserProfilePage from './pages/UserProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CinemaGuesserApp />
      {/* <UserProfilePage /> */}
      {/* <LeaderboardPage /> */}
      {/* <GamePage/> */}
      {/* <Nav /> */}
      {/* <ResetPasswordPage/> */}
      {/* <EmailCheck/> */}
      {/* <RegistrationSuccess/> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
