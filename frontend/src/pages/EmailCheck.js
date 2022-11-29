import { useNavigate, useSearchParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

export default function EmailCheck() {
  const navigate = useNavigate();

  /*setTimeout(() => {
    console.log("hi");
  }, 0);*/
  function move(){
    navigate('/');
  }
  
return (
    <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
        <div>A registration link has been sent to your email! </div>
        <div onClick={move} style={{cursor: 'pointer'}}>Click here to return to login page.</div>
    </h1>
);
  

}
