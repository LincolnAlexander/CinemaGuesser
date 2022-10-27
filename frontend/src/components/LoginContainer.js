
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
    <div className="flex flex-1 flex-col content-center items-center w-96 lg:w-3/5 max-w-lg bg-pr-black rounded-xl shadow border p-8">
          <p className='text-lg font-medium'>Username</p>
          <input className='border rounded border-pr-white p-1 w-64 h-8 text-center' type='text' placeholder='Enter Login' ref={(c) => loginName = c} />

          <p className='text-lg font-medium'>Password</p>
          <input className='block border rounded border-pr-white p-1 w-64 h-8 text-center' type='password' placeholder='Enter Password' ref={(c) => loginPassword = c} />

          <button className='block border my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red text-white w-36 h-10 font-medium' type='button' onClick={doLogin}>Login</button>
          <a className='text-pr-yellow text-center font-medium' href="#" type='button'>Register</a>
    </div>
  );
}

export default LoginContainer;
