import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function MovieModal(props) {
  const [movieModal, setMovieModal] = useState(false);

  useEffect(() => {
    setMovieModal(props.value);
  }, [props.value]);

  const toggleModal = () => {
    setMovieModal(false);
    props.closeRoundModal();
  };
  return (
    <>
      {/*<button className={props.classes} onClick={toggleModal}>
        Rules
  </button>*/}

      {movieModal && (
        <div className='overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50'>
          <div
            onClick={toggleModal}
            className='w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70'
          ></div>
            {/*<div className='min-h-[50px] row-span-1 sm:row-span-6 text-center justify-self-center'>
            </div>*/}
            <div className='grid grid-cols-1  sm:grid-cols-2 gap-3 absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-zinc-800 
            px-4 sm:px-16 py-8 rounded-md max-w-4xl w-screen sm:w-4/5 lg:w-3/5 xl:w-3/5  text-pr-white text-sm md:text-lg lg:text-xl'>
              
              <div className='col-span-1 text-center justify-self-center'>
              <p className='text-pr-yellow text-xl mb-4'>{props.title} &#40;{props.year}&#41;</p>
                <img
                  className='w-24 sm:w-60 sm:h-84 rounded-lg'
                  src={props.poster}
                  alt='MoviePoster'
                ></img>
              </div>
              
              <div className='row-span-1 text-base text-center sm:text-left'>
                <p className='mb-2 text-pr-yellow'>Description: <span className='text-pr-white pr-2'>{props.desc}</span></p>
                <p className='mb-2 text-pr-yellow mr-2'>Genre: <span className='text-pr-white pr-2'>{props.genre}</span></p>
                
                <p className=' mb-2 text-pr-yellow mr-2  '>Released: <span className='text-pr-white pr-2  '>{props.released}</span></p>
                
                <p className='mb-2 text-pr-yellow mr-2'>Actors: <span className='text-pr-white pr-2'>{props.actors}</span></p>
                
                <p className='mb-2 text-pr-yellow mr-2 '>Rating: <span className='text-pr-white pr-2'>{props.rating + " via " + props.source}</span></p>
                
                <p className='mb-2 text-pr-yellow mr-2 '>Box Office: <span className='text-pr-white pr-2'>{props.boxOffice}</span></p>
                {props.director ? 
             (<div className='mb-2 text-base text-center sm:text-left'>
                <span className='text-pr-yellow mr-2 '>Director:</span>
                <span className='text-pr-white pr-2'>{props.director}</span>
             </div>):
             (<div className='mb-2 text-sm text-center sm:text-left'>
                <span className='text-pr-yellow mr-2 '>Writer {'(' + 's' + ')'}:</span>
                <span className='text-pr-white pr-2'>{props.writer}</span>
              </div>)}
              <div className='mb-2 text-base  text-center sm:text-left'>
                <span className='text-pr-yellow mr-2 '>Rated:</span>
                <span className='text-pr-white pr-2'>{props.rated}</span>
              </div>
              {props.runtime ? 
             (<div className='mb-2 text-base  text-center sm:text-left'>
                <span className='text-pr-yellow mr-2 '>Runtime:</span>
                <span className='text-pr-white pr-2'>{props.runtime}</span>
             </div>):
             (<div className='mb-2 text-base text-center sm:text-left'>
                <span className='text-pr-yellow mr-2 '>Total Seasons:</span>
                <span className='text-pr-white pr-2'>{props.totalSeasons}</span>
              </div>)}
              </div>
              
             
        
             {/* <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div> */}
                <XMarkIcon
                className='absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-900 text-gray-400 hover:bg-pr-red hover:text-white hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                onClick={toggleModal}
                >
                Close
                </XMarkIcon>
            </div>
            {/*<div class="grid grid-flow-col gap-3">
                <div class="bg-blue-100 col-span-1">1st col</div>
                <div class="bg-red-100 col-span-4">2nd col</div>
    </div>*/}
        </div>
      )}
    </>
  );
}
