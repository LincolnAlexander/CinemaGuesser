import { useState, useEffect } from 'react';
import { XMarkIcon, CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ReactComponent as PlayAgainBtn } from '../../images/PlayAgainBtn.svg';
import { useNavigate } from 'react-router-dom';

export default function PlayAgainModal(props) {
  const navigate = useNavigate();
  // console.log(props);
  const [modal, setModal] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem('user_data')).login);

  useEffect(() => {
    setClicked(props.inWatchList)
    setModal(props.value);

  }, [props.value]);

  // console.log("Modal value:"+ modal);
  const toggleModal = () => {
    // props.value = !props.value;
    setModal(false);
    props.closePlayAgainModal();
  };

  const toggleWatchlist = async (event) => {
    let obj = {
      login: login,
      title: props.title.toLowerCase()
    };
    let js = JSON.stringify(obj);
    try {
      let bp = require('../Paths.js');
      // 'https://cinema-guesser.herokuapp.com/api/remove_watchlist'
      // bp.buildPath('api/remove_watchlist')
      const response = await fetch(bp.buildPath('api/watchlist_toggle'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(res.value);
      let res = JSON.parse(await response.text());

      if (res.error && res.error !== '') 
        console.log(res.error)
      else{
      }      
    } catch (e) {
      console.log(e);
      return;
    }
  }
  const handleClick = async () =>{
    await toggleWatchlist();
  }
  const toggleClick = () =>{
    setClicked(!clicked);
  }

  return (
    <>
      {modal && (
        <div className='overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50'>
          <div
            // onClick={toggleModal}
            className='w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70'
          ></div>
          <div className='absolute top-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-zinc-800 px-4 sm:px-16 py-8 rounded-md w-5/6 max-w-4xl text-pr-white text-sm md:text-lg lg:text-xl'>
            <div className='grid grid-cols-1 gap-y-2'>
              <div className=' min-h-[50px]'>
                <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
                  Game Over
                </h2>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>Last Movie Rating:</span>
                <span className='text-pr-red pr-2'>{props.rating}%</span>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>You Scored:</span>
                <span className='text-pr-red pr-2'>{props.score}pts</span>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>Total Score:</span>
                <span className='text-pr-red pr-2'>{props.totalScore}pts</span>
              </div>
              <div className='min-h-[50px]'>
                <span className='text-pr-yellow mr-2'>Overall Points:</span>
                <span className='text-pr-red pr-2'>
                  {props.overallPoints}pts
                </span>
              </div>
              <div className='justify-self-center min-h-[50px]'>
                <button
                  onClick={() => {
                    if(clicked)
                      handleClick()
                    props.closePlayAgainModal();
                    navigate('/game');
                  }}
                >
                  <PlayAgainBtn className='w-20 sm:w-auto' />
                </button>
              </div>
              {/* <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div> */}
            </div>
            {clicked ? 
              (<CheckIcon
                className='absolute top-[15px] right-[60px] 
                block h-8 w-8 rounded-md bg-green-600 text-black-400 hover:bg-green-800 hover:text-gray
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer' title='Remove Movie from WatchList'
                onClick = {toggleClick}>
                </CheckIcon>):
                (<PlusIcon 
                  className='absolute top-[15px] right-[60px] 
                  block h-8 w-8 rounded-md bg-gray-900 text-gray-400 hover:bg-green-600 hover:text-white 
                  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:cursor-pointer' title='Add Movie to WatchList' 
                onClick = {toggleClick}>
                </PlusIcon>)
              }
            <XMarkIcon
              className='absolute top-[15px] right-[15px] block h-8 w-8 rounded-md bg-gray-900 text-gray-400 hover:cursor-pointer hover:bg-pr-red hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
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
