import { useNavigate, useSearchParams } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

export default function EmailCheck() {
  const navigate = useNavigate();

  /*setTimeout(() => {
    console.log("hi");
  }, 0);*/
  
return (
    <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
        <div>A registration link has been sent to your email!<br/>Return to login page.</div>
    </h1>
);
  

}
