import React from 'react';
import LoginContainer from "../components/LoginContainer";
import Welcome from '../components/Welcome';

import {ReactComponent as Blob} from '../images/blob-gradient.svg';



  
function LoginPage() {
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
};

export default LoginPage;