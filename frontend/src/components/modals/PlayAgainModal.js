import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactComponent as PlayAgainBtn } from '../../images/PlayAgainBtn.svg';
import { useNavigate } from 'react-router-dom';

export default function PlayAgainModal(props)
{
    
    const navigate = useNavigate();
    // console.log(props);
    const [modal, setModal] = useState(false);

    useEffect(()=> {
      setModal(props.value)
    }, [props.value])
    // console.log("Modal value:"+ modal);
    const toggleModal = () =>
    {
        // props.value = !props.value;
        setModal(false);
        props.closeModal();
    }
    return(
        <>

      {modal && (
        <div className='overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50'>
          <div
            onClick={toggleModal}
            className='w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70'
          ></div>
          <div className='absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-gray-900 px-4 sm:px-16 py-8 rounded-md w-1/3 max-w-5xl text-pr-white text-sm md:text-lg lg:text-xl'>
            <div className='grid grid-cols-1'>
              <div className=' min-h-[50px]'>
                <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
                  Game Over
                </h2>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>Movie Rating:</span>
                <span className='text-pr-white pr-2'>{props.rating}</span>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>Your Best Guess:</span>
                <span className='text-pr-white pr-2'></span>
              </div>
              <div className='rmin-h-[50px]'>
                <span className='text-pr-yellow mr-2'>You Scored:</span>
                <span className='text-pr-white pr-2'>pts</span>
              </div>
              {/* <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div> */}
              {/* <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div> */}
             

            </div>
            
            
            <button onClick={()=> {props.closeModal(); navigate('/game'); props.loadMovieInfo()}}>
              <PlayAgainBtn/>
            </button>
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
    )
}