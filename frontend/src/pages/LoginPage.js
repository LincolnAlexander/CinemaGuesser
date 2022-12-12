import React, { useEffect } from 'react';
import LoginContainer from '../components/LoginContainer';
import Welcome from '../components/Welcome';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Blob } from '../images/blob-gradient.svg';

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user_data');
    if (auth) navigate('/home');
  });

  return (
    <>
      <Welcome></Welcome>
      <LoginContainer></LoginContainer>

      {/* <Blob className='w-64 absolute bottom-12 right-96'/>
      <Blob className='w-64 absolute right-5 top-24'/>
      <Blob className='w-96 absolute inset-x-24'/>
      <Blob className='w-64 absolute inset-y-24'/> */}
    </>
  );
}

export default LoginPage;
