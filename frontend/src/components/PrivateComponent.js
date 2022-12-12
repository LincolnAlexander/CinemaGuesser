import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateComponent() {
  const auth = localStorage.getItem('user_data');
  return auth ? <Outlet /> : <Navigate to='/' />;
}
