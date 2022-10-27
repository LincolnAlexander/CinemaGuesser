import React from 'react';
import LoginContainer from "../components/LoginContainer";
import Welcome from '../components/Welcome';


  
function LoginPage() {
  return (
    <div>
      <Welcome></Welcome>
      <LoginContainer></LoginContainer>
    </div>
    
  );
};

export default LoginPage;