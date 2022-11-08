import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function GameContainer()
{
    return(
    // <div className='flex justify-center mt-20'>
      
    //   <div className='flex justify-center items-start w-1/2'>
        
    //     <div className='flex flex-row w-full justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
    //       <div className='flex flex-col border basis-2/5'>
    //         <p className=' text-pr-yellow'>Name of Movie</p>
    //       </div>
    //       <div className='flex flex-col border basis-3/5 '>
    //         a
    //       </div>
    //     </div>
    //   </div>
      
    // </div>
    <div className='flex justify-center mt-20 '>
      <div className='mt-20 grid grid-cols-1 sm:grid-cols-2 w-1/2 gap-x-5 gap-y-4 bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-md'>
        <div className='text-center mt-5'>
          <p className='text-pr-yellow'>Name of Movie</p>
        </div>
        <div className='min-h-[50px] text-center mt-5'>
          <p className='text-pr-yellow'>Score:</p>
        </div>
        <div className='min-h-[50px] row-span-1 sm:row-span-6 text-center '>
          Movie Poster
        </div>
        <div className='min-h-[50px] '>
          <p className='text-pr-yellow'>Description:</p>
          <p className='text-pr-white'></p>
        </div>
        <div className='min-h-[50px]'>
          <span className='text-pr-yellow mr-2'>Genre:</span>
          <span className='text-pr-white'>Action</span>
        </div>
        <div className='min-h-[50px]'>
          <span className='text-pr-yellow mr-2'>Box Office:</span>
          <span className='text-pr-white'>$</span>
        </div>
        <div className='bg-green-500 rounded-lg shadow-xl min-h-[50px]'></div>
        <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div>
        <div className='min-h-[50px] col-span-1 sm:col-span-2 text-center'>
          <input placeholder='Guess Rating'></input>
        </div>
      </div>
    </div>
    
    )
}
export default GameContainer;