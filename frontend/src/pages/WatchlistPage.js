import React from 'react';
import WatchlistContainer from '../components/WatchlistContainer';



function WatchlistPage()
{
    return(
        <>
            <div className='flex justify-center text-pr-white mt-20 flex-col'>
                <p className='text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold' >Watchlist</p>
                <p className='text-center text-pr-white text-md'>Click the + button when playing the game to add movie to watchlist</p>
                <p className='text-center text-pr-white text-md'>Click the movie to view more information!</p>
            </div>
            <WatchlistContainer/>
        </>
    )
}

export default WatchlistPage;