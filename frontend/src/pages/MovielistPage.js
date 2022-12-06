import React from 'react';
import MovielistContainer from '../components/MovielistContainer';

function MovielistPage()
{
    return(
        <>
            <div className='flex justify-center text-pr-white mt-20 flex-col'>
                <p className='text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold' >Movielist</p>
                <p className='text-center text-pr-white text-md'>A collection of movies in our database!</p>
                <p className='text-center text-pr-white text-md'>Click the movie to view more information!</p>
            </div>
            <MovielistContainer/>
        </>
    )
}

export default MovielistPage;