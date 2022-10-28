
import React, { useState } from 'react';
import AppLogo from '../images/AppLogo.png';
import {ReactComponent as Circle} from '../images/FigmaImg.svg';
import {ReactComponent as Blob} from '../images/blob-gradient.svg';

const LoginContainer = () => {
  var loginName;
  var loginPassword;

  const [message, setMessage] = useState('');

  const doLogin = async event => {
    event.preventDefault();

    var obj = { username: loginName.value, password: loginPassword.value };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch('http://localhost:5000/api/login',
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      }
      else {
        var user = { firstName: res.firstName, lastName: res.lastName, id: res.id }
        localStorage.setItem('user_data', JSON.stringify(user));

        setMessage('');
        window.location.href = '/cards';
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }
  };
  
  return (
    <div className='flex justify-center mt-20'>
      <div className="flex justify-center items-start w-1/2">
        <div className = "flex flex-col basis-1/2 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm">
          <form className='mt-10'>
            <div className='relative'>
              <input className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent' id='username' placeholder='a'></input>
              <label className = 'absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md ' htmlFor='username'>Username</label>
            </div>
            <div className='relative mt-8'>
              <input className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent' id='username' placeholder='a'></input>
              <label className = 'absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md ' htmlFor='username'>Password</label>
              <button className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold ' type='button' onClick={doLogin}>Login</button>
            </div>
          </form>
          <div>
            <span className='text-pr-white pr-2'>Don't have an account?</span>
            <a className='text-pr-yellow text-center font-medium hover:font-extrabold hover:underline' href="#" type='button'>Register</a>
            <a className='block text-pr-yellow text-center font-medium hover:font-extrabold hover:underline' href="#" type='button'>Forgot Password?</a>
          </div>
              
        </div>
        {/* <div className='flex basis-1/2 w-full h-full justify-center items-center '>
          <Blob/>
          
        </div> */}
      </div>
    </div>
  );
}

export default LoginContainer;
