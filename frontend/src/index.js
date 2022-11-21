import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CinemaGuesserApp from './CinemaGuesserApp';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import GamePage from './pages/GamePage';
import Nav from './components/Nav';
import LeaderboardPage from './pages/LeaderboardPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CinemaGuesserApp />
      {/*<LeaderboardPage />*/}
      {/* <GamePage/> */}
      {/* <Nav /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
