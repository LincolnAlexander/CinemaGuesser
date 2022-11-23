import React from 'react';
import WatchlistContainer from '../components/WatchlistContainer';



function WatchlistPage()
{
    return(
        <>
            <div className='flex justify-center text-pr-white mt-20'>
                <p className='text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold' >Watchlist</p>
            </div>
            <WatchlistContainer/>
        </>
    )
}

export default WatchlistPage;