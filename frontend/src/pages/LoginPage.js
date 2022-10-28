import React from 'react';
import LoginContainer from "../components/LoginContainer";
import Welcome from '../components/Welcome';

import {ReactComponent as Blob} from '../images/blob-gradient.svg';


  
function LoginPage() {
  return (
    <>
    <Welcome></Welcome>
    <LoginContainer></LoginContainer>
    <Blob className='w-60 '/>
    </>
    
  );
};

export default LoginPage;