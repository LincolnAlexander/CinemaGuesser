import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user_data');
    if (auth) navigate('/home');
  });

  

  return (
    <>
      <div className='flex justify-center mt-20'>
        <div className='flex justify-center items-start w-1/2'>
          <div className='flex flex-col flex-none basis-72 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
            <p> Verification????</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedirectPage;
