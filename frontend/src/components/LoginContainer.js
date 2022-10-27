
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

    <div className="flex justify-center items-start h-full">
      <div className="flex flex-col content-center items-center w-96 my-28 md:my-36 xl:my-96 mx-2 lg:w-3/5 max-w-lg bg-pr-black rounded-xl shadow border-2 pt-6 pb-8">
            <input className='bg-pr-black border-b-2 border-pr-yellow focus:border-b-4 focus:outline-0 focus:font-bold mt-8 mb-4 w-64 h-8 placeholder-pr-white text-center text-pr-white' type='text' placeholder='Enter Login' ref={(c) => loginName = c} />
            <input className='block bg-pr-black border-b-2 border-pr-yellow focus:border-b-4 focus:outline-0 focus:font-bold my-4 w-64 h-8 placeholder-pr-white text-center text-pr-white' type='password' placeholder='Enter Password' ref={(c) => loginPassword = c} />

            <button className='block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red hover:border-2 text-white w-36 h-10 font-medium hover:font-extrabold hover:underline hover: bg-pr-yellow' type='button' onClick={doLogin}>Login</button>
            <a className='text-pr-yellow text-center font-medium hover:font-extrabold hover:underline hover:text-pr-white' href="#" type='button'>Register</a>
      </div>
    </div>
  );
}

export default LoginContainer;
