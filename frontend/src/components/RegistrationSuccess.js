import { useNavigate, useSearchParams } from 'react-router-dom';
import React, {useState, useEffect, useCallback} from 'react';

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /*setTimeout(() => {
    console.log("hi");
  }, 0);*/
  // setTimeout(() => {
      
  //   navigate('/');
  // }, 10000);

  useEffect(() => {
    validate()
  }, []);
  const validate = async (event) => {
    //get key and pass into endpoint
    var t = searchParams.get("key")
    
    try {
      let bp = require('./Paths.js');
      let obj = {}
      let js = JSON.stringify(obj);
      
      // 'https://cinema-guesser.herokuapp.com/api/email_verify?key=' + t
      // bp.buildPath('api/email_verify?key=' + t)
      console.log(bp.buildPath('api/email_verify?key=' + t));
      const response = await fetch(bp.buildPath('api/email_verify?key=' + t), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      let res = JSON.parse(await response.text());
      console.log(res)

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
  }
  return (
    <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
        <div>Registration Successful!<br/>
        <button className='text-pr-red ' onClick={() => navigate('/')}>Click Here to Login</button></div>
    </h1>
  );
  

}
