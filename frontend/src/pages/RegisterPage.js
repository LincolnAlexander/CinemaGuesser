import React, { useEffect } from 'react';
import RegisterContainer from '../components/RegisterContainer';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user_data');
    if (auth) navigate('/home');
  });

  return (
    <>
      <div className='flex flex-col justify-center'>
        <p className='text-center mt-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold'>
          Create Your Account Below
        </p>
      </div>
      <RegisterContainer />
    </>
  );
}

export default RegisterPage;
