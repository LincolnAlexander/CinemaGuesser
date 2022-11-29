import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdatePasswordPage() {
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const doRegister = async (event) => {
    event.preventDefault();

    const newPasswordRef = newPasswordRef.current.value;
    const confirmPasswordRef = confirmPasswordRef.current.value;
    
    let obj = {
      
    };
    let js = JSON.stringify(obj);

    try {
      let bp = require('./Paths.js');
      const response = await fetch(bp.buildPath('api/register'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      let res = JSON.parse(await response.text());

      if (res.error !== '') {
        setMessage('Username is taken, please try a different one.');
      } else {
        // const user = {
        //   firstName: res.firstName,
        //   lastName: res.lastName,
        //   id: res.id,
        // };
        // localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        navigate('/register-success');
      }
    } catch (e) {
      alert(e.toString());
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
            
          <form className='relative m-10' onSubmit={doRegister}>
            <div className='flex flex-col w-full'>
              <div className='relative w-full'>
                <input
                  className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent mr-4'
                  id='newPassword'
                  ref={newPasswordRef}
                  type='text'
                  placeholder='a'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Empty Field!
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
                  type='text'
                  placeholder='a'
                  onBlur={handleFocus}
                  focused='false'
                  required
                ></input>
                <span className='text-pr-yellow text-xs peer-valid:hidden'>
                  Empty Field!
                </span>
                <label
                  className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='confirmPassword'
                >
                  Confirm New Password
                </label>
              </div>
              
              
            </div>

            <div>
              <button
                className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                type='submit'
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordPage;
