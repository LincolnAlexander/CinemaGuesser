
import React, { useState } from 'react';

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

    // flex flex-col container mx-auto bg-gray-200 border-solid border-black 
    // <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <div className='flex justify-center items-center border border-black '>
      <div className = "flex-col justify-center items-center">
        <div className='m-5'>
          <p className='text-lg font-medium text-pr-white'>Username</p>
          <input className = 'border-2 border-pr-yellow rounded border-black w-64 h-8 focus:outline-none bg-transparent text-pr-white ' type = 'text' placeholder='Enter Login' ref={(c) => loginName = c}/>
        </div>
        <div className='m-5'>
          <p className='text-lg font-medium text-pr-white'>Password</p>
          <input className='border-2 border-pr-yellow rounded border-black w-64 h-8 focus:outline-none bg-transparent text-pr-white' type='password' placeholder='Enter Password' ref={(c) => loginPassword = c} />
        </div>
        <div className='m-5'>
          <button className = 'btn btn-xs sm:btn-sm md:btn-md lg:btn-lg b rounded-full bg-blue-500 text-white w-64 h-10 font-medium ' type = 'button' onClick={doLogin}>Login</button>
        </div>
        <div className='m-5 text-center'>
          <p className='text-md font-medium text-pr-white pr-1.5'>Don't have an account?</p><span><a className = "text-md font-medium text-pr-yellow"href="" >Create Account</a></span>
        </div>

            <button className='block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red hover:border-2 text-white w-36 h-10 font-medium hover:font-extrabold hover:underline hover: bg-pr-yellow' type='button' onClick={doLogin}>Login</button>
            <a className='text-pr-yellow text-center font-medium hover:font-extrabold hover:underline hover:text-pr-white' href="#" type='button'>Register</a>
      </div>
    </div>
  );
}

export default LoginContainer;
