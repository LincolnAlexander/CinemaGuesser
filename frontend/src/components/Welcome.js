import React from 'react';


function Welcome()
{
    return(
        <div className='flex flex-col justify-center'>
            <p className='text-center mt-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold' >Welcome to CinemaGuesser! </p>
            <p className='text-center text-sm text-pr-white font-medium'>The Movie Rating Guessing Game</p>
        </div>
    )
}

export default Welcome;