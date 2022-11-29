import { useNavigate, useSearchParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /*setTimeout(() => {
    console.log("hi");
  }, 0);*/
 
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
      console.log("1 " + sessionStorage.getItem('verified'));

      if (res.length == 0 || (res.error && res.error !== '')) {
        //console.log(res.error);
        if(sessionStorage.getItem('verified') === null){
          sessionStorage.setItem('verified', false)
        }
      } 
      else 
      {
        sessionStorage.setItem('verified', true)
      }
    } 
    catch (e) 
    {
      console.log(e);
      return;
    }
  }
  if(JSON.parse(sessionStorage.getItem('verified')) === true)
  {
    return (
      <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
          <div>Registration Successful!<br/>Please login.</div>
      </h1>
    );
  }
  else
  {
    return (
      <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
          <div>Invalid key.<br/>Click here to return to login page.</div>
      </h1>
    );
  }
  

}
