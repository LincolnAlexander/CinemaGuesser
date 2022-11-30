import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user_data');
    if (auth) navigate('/home');
  });

  const emailRef = useRef();
  function sett(e)
  {
    e.preventDefault();
    setTimeout(() => {
      
      navigate('/');
    }, 5000);
  }
  const handleFocus = (e) => {
    const input = e.target;
    input.setAttribute('focused', 'true');
  }
  return (
    <>
      <div className='flex justify-center mt-20'>
        
        <div className='flex justify-center items-start w-1/2'>
          
          <div className='flex flex-col flex-none basis-72 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
            <p className='text-pr-white text-xl font-medium bold mt-5'>Reset Password</p>
            <form className='mt-10'>
              <div className='relative'>
              <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='email'
                  ref={emailRef}
                  type='email'
                  placeholder='a'
                  pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Invalid Email!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='email'
                >
                  Enter Email
                </label>
                <button
                  className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                  type='submit'
                  // onClick={() => navigate('/register')}
                  onClick = {sett}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
