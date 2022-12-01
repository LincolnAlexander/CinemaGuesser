import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPasswordPage() {
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const resetPassword = async (event) => {
    event.preventDefault();

    // newPasswordRef = newPasswordRef.current.value;
    // confirmPasswordRef = confirmPasswordRef.current.value;
    
    if(newPasswordRef.current.value == '' || confirmPasswordRef.current.value== '')
    {
      
      setMessage('Empty Field!')
      return;
    }
    else if(newPasswordRef.current.value != confirmPasswordRef.current.value)
    {
      
      setMessage("Passwords don't match!");
      return;
    }
    
    
    var t = searchParams.get("key")
    
    try {
      let bp = require('./Paths.js');
      let obj = 
      {
        password: confirmPasswordRef.current.value,
        key: t,
      }
      let js = JSON.stringify(obj);
      
      // 'https://cinema-guesser.herokuapp.com/api/update-password?key=' + t
      // bp.buildPath('api/update-password' + t)
      console.log(bp.buildPath('api/update_password?key=' + t));
      const response = await fetch(bp.buildPath('api/update_password?key=' + t), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());

      if (res.length == 0 || (res.error && res.error !== '')) {
        //console.log(res.error);

    
      } 
      else 
      {

      }
    } 
    catch (e) 
    {
      console.log(e);
      return;
    }
  };

  const handleFocus = (e) => {
    const input = e.target;
    input.setAttribute('focused', 'true');
  };

  return (
    <div className='flex justify-center m-20'>
        
      <div className='flex justify-center items-start w-1/2 '>
      
        <div className='flex flex-col basis-1/2 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm mb-8'>
            
          <form className='relative m-10' onSubmit={resetPassword}>
            <div className='flex flex-col w-full'>
              <div className='relative w-full'>
                <input
                  className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent mr-4'
                  id='newPassword'
                  ref={newPasswordRef}
                  type='password'
                  placeholder='a'
                  onBlur={handleFocus}
                  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
                  onClick = {() => setMessage('')}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs w-52 peer-valid:hidden'>
                  Must be 8-20 characters and contain 1 letter, 1 number, 1
                  special character!
                </span>
                <label
                  className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='newPassword'
                >
                  New Password
                </label>
              </div>
              
              <div className='relative w-full mt-10'>
                <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='confirmPassword'
                  ref={confirmPasswordRef}
                  type='password'
                  placeholder='a'
                  onBlur={handleFocus}
                  pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
                  onClick = {() => setMessage('')}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs w-52 peer-valid:hidden'>
                  Must be 8-20 characters and contain 1 letter, 1 number, 1
                  special character!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='confirmPassword'
                >
                  Confirm New Password
                </label>
              </div>
              <div className='relative w-full mt-5'>
                <p className='text-pr-white text-lg bold'>{message}</p>
              </div>
              
              
            </div>

            <div>
              <button
                className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                type='submit' onClick={resetPassword}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
