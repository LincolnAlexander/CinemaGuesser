import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import scoob from '../../images/scoob.gif';
export default function RulesModal(props) {
  const [rulesModal, setRulesModal] = useState(false);

  const toggleModal = () => {
    setRulesModal(!rulesModal);
  };

  return (
    <>
      <button className={props.classes} onClick={toggleModal}>
        Rules
      </button>

      {rulesModal && (
        <div className='overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50'>
          <div
            onClick={toggleModal}
            className='w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70'
          ></div>
          <div className='absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-gray-900 px-4 sm:px-16 py-8 rounded-md w-4/5 max-w-5xl text-pr-white text-sm md:text-lg lg:text-xl'>
            {/* <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
              Rules
            </h2> */}
            <p className='text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-yellow font-bold' >Welcome Agent!</p>
            <p className='text-center text-base text-pr-white font-medium mt-5'>
              Use your specialized skill set to guess the movie rating out of 100.
            </p>
            <p className='text-center text-base text-pr-white font-medium '>
              Your file will include the movie poster, plot, actors, cast, and how much money it earned in the box office.
              
            </p>
            <p className='text-center text-base text-pr-white font-medium '>
              The closer you are to the movie rating, the more points you score. 
            </p>
            <p className='text-center text-base text-pr-white font-medium '>
              Good Luck Agent! 
            </p>
            {/* <Scoob/> */}
            {/* <img className='w-32 absolute top-[15px] right-[125px] block' src={scoob}></img> */}
            <XMarkIcon
              className='absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
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
