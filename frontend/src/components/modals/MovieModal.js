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
            <div className='min-h-[50px] row-span-1 sm:row-span-6 text-center justify-self-center'>
            </div>
            <div className='absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-zinc-800 
            px-4 sm:px-16 py-8 rounded-md w-5/6 max-w-4xl text-pr-white text-sm md:text-lg lg:text-xl'>
                <div className='min-h-[150px] col-xs-8'>
                    <span className='text-pr-yellow mr-2'>{props.title}</span>
                </div>
                <XMarkIcon
                className='absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                onClick={toggleModal}
                >
                Close
                </XMarkIcon>
            </div>
        </div>
      )}
    </>
  );
}
