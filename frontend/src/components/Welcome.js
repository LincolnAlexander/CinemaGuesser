import React from 'react';


function Welcome()
{
    return(
        <div className='flex flex-col justify-center'>
            <div className='flex justify-center'>
                <p className='mt-10 text-3xl text-pr-white font-bold' >Welcome to CinemaGuesser! </p>
            </div>
            <div className='flex justify-center mt-2'>
                <p className='text-md text-pr-white font-medium'>Short Desc of game</p>
            </div>
            
        </div>
    )

}

export default Welcome;