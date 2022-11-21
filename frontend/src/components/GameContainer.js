import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SubmitBtn } from '../images/SubmitBtn.svg';
import PlayAgainModal from './modals/PlayAgainModal';
import RoundModal from './modals/RoundModal';

function GameContainer() {
  const storage = require('../tokenStorage.js');
  let _ud = localStorage.getItem('user_data');
  let ud = JSON.parse(_ud);
  // var firstName = ud.firstName;
  // var lastName = ud.lastName;
  let loginName = ud.login;
  // console.log("FirstName: "+ firstName +"\nLastName: "+ lastName +"\nLogin: "+ loginName);

  // Code for Movie Info ***************************************************************************************************************
  const [desc, setDesc] = useState(false);
  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(false);
  const [boxOffice, setBoxOffice] = useState(false);
  const [genre, setGenre] = useState(false);
  const [actors, setActors] = useState(false);
  const [rating, setRating] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    loadMovieInfo();
  }, []);

  const loadMovieInfo = async (event) => {
    // event.preventDefault();
    //console.log(event);

    let obj = {};
    let js = JSON.stringify(obj);
    try {
      let bp = require('./Paths.js');
      // 'https://cinema-guesser.herokuapp.com/api/movies_saved'
      // bp.buildPath('api/movies_saved')
      const response = await fetch(bp.buildPath('api/movies_saved'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(res);
      let res = JSON.parse(await response.text());

      setDesc(res.omdb.Plot);
      setActors(res.omdb.Actors);
      setBoxOffice(res.omdb.BoxOffice);
      setGenre(res.omdb.Genre);
      setPoster(res.omdb.Poster);
      setRating(parseInt(res.omdb.Ratings));
      setTitle(res.omdb.Title);

      // console.log("Results:");
      console.log(res.omdb);
      if (res.error !== '') {
        // setMessage('Username is taken, please try a different one.');
      } else {
        // setMessage('');
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };
  // End of Code for Movie Info ***********************************************************************************************************************

  // Code for Modal ***********************************************************************************************************************************
  const navigate = useNavigate();
  const [turnOn, setRoundModal] = useState(false);
  const [turnOny, setPlayAgainModal] = useState(false);
  const [curGuess, setGuess] = useState(1);
  const [round, setRound] = useState(0);
  let guesses = useRef(null);
  let gg;

  const handleGuess = (event) => {
    event.preventDefault();
    // console.log(guesses.current.value);

    // if( event.target.value === undefined)
    // {
    //   console.log(true);
    //   guesses = 0;
    //   showModal(event, guesses);
    // }
    // else
    // {
    //   guesses = event.target.value;
    //   showModal(event, guesses);
    // }
    gg = guesses.current.value;
    showModal(event, guesses.current.value);
  };
  function showModal(event, g) {
    event.preventDefault();

    setGuess(curGuess + 1);
    setRound(round + 1);

    // setPrevRating(prevRating);
    setScore(score + pointsAwarded(Math.abs(g - rating)));
    setTotalScore(totalScore + (score + pointsAwarded(Math.abs(g - rating))));

    // setPrevScore(score);
    // console.log("Score: "+score);
    console.log('Rating: ' + rating);
    console.log('Guess: ' + g);
    // console.log("Total Score: "+totalScore);

    if (curGuess === 5) {
      setGuess(1);

      // console.log(score);
      // setScore(0);
      // console.log("Showing PlayAgainModal");
      // console.log("Users guesses" + g);
      calcScore();
      setPlayAgainModal(true);
    } else {
      setRoundModal(true);
      // loadMovieInfo();
    }

    // console.log(curGuess);
  }

  function closeRoundModal() {
    setRoundModal(false);
    loadMovieInfo();
    setScore(0);
    guesses.current.value = '';
  }

  function closePlayAgainModal() {
    // calcScore();
    setPlayAgainModal(false);
    loadMovieInfo();
    setTotalScore(0);
    setScore(0);
    setRound(0);
    guesses.current.value = '';
  }

  //exponential (delta 30)
  /*function pointsAwarded(delta) {
      if (delta >= 30) return 0;
      
      let exp = delta - 30;
      return Math.round((1/9) * exp * exp);
    }*/
  //single linear (delta 33, 3)
  function pointsAwarded(delta) {
    if (delta >= 33) return 0;
    if (delta === 0) return 120;
    return Math.round(100 - 3 * delta);
  }
  //double linear (delta 26, slope 2 [delta <= 10], slope 5 [delta > 10])
  /*function pointsAwarded(delta) {
      if (delta >= 26) return 0;
      if (delta == 0 ) return 120;
      if (delta <= 10) return Math.round(100 - 2 * delta)
      return Math.round(130 - 5 * delta);
    }*/
  // End of Code for Modal *****************************************************************************************************************************

  const [overallPoints, setOverall] = useState(0);
  const calcScore = async (event) => {
    // event.preventDefault();
    //console.log(event);
    //var storage = require('../tokenStorage.js');
    //retrieve token here
    let tok = storage.retrieveToken();
    //add to score
    let obj = {
      login: loginName,
      value: totalScore,
      mode: 1,
      field: 'Score',
      jwtToken: tok,
    };
    let js = JSON.stringify(obj);
    try {
      let bp = require('./Paths.js');
      // 'https://cinema-guesser.herokuapp.com/api/op_stats'
      // bp.buildPath('api/op_stats')
      const response = await fetch(bp.buildPath('api/op_stats'), {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });
      // console.log(res.value);
      let res = JSON.parse(await response.text());

      console.log('Total Points:' + res.value);
      setOverall(res.value);
      //store refreshed token (has accessToken field)
      storage.storeToken(res.jwtToken);

      if (res.error !== '') {
        // setMessage('Username is taken, please try a different one.');
      } else {
        // setMessage('');
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  // Decrement/increment guess value for user input
  function decrement(e) {
    e.preventDefault();

    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    target.value = value;
  }

  function increment(e) {
    e.preventDefault();

    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    target.value = value;
  }

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 w-5/6 lg:max-w-screen-lg p-1 md:p-4 gap-x-5 gap-y-4 bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-md'>
        <div className='text-center mt-5'>
          <p className='text-pr-yellow text-xl'>{title}</p>
        </div>
        <div className='min-h-[50px] text-center mt-5'>
          <span className='text-pr-yellow mr-2'>Score:</span>
          <span className='text-pr-red pr-2 '>{totalScore}pts</span>
        </div>
        <div className='min-h-[50px] row-span-1 sm:row-span-6 text-center justify-self-center'>
          <img
            className='w-32 sm:w-60 sm:h-84 rounded-lg'
            src={poster}
            alt='MoviePoster'
          ></img>
        </div>
        <div className='min-h-[50px] text-center sm:text-left'>
          <p className='text-pr-yellow'>Description:</p>
          <p className='text-pr-white pr-2'>{desc}</p>
        </div>
        <div className='min-h-[50px] text-center sm:text-left'>
          <span className='text-pr-yellow mr-2'>Genre:</span>
          <span className='text-pr-white pr-2'>{genre}</span>
        </div>
        <div className='min-h-[50px] text-center sm:text-left'>
          <span className='text-pr-yellow mr-2'>Box Office:</span>
          <span className='text-pr-white pr-2'>{boxOffice}</span>
        </div>
        <div className='min-h-[50px] text-center sm:text-left'>
          <span className='text-pr-yellow mr-2 '>Actors:</span>
          <span className='text-pr-white pr-2'>{actors}</span>
        </div>
        {/* <div className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></div> */}
        <div className='min-h-[50px] col-span-1 sm:col-span-2 text-center  '>
          <form className='sm:flex justify-center sm:flex-wrap'>
            {/* <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"> */}
            <button
              data-action='decrement'
              className='flex-none my-1 bg-pr-gray text-pr-black hover:bg-pr-yellow hover:text-pr-white h-full w-8 rounded-2xl cursor-pointer outline-none'
              onClick={decrement}
            >
              <span className='m-auto text-2xl font-light'>−</span>
            </button>
            <input
              className='peer h-10 w-32 sm:w-48 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent focus:placeholder-transparent text-center'
              ref={guesses}
              placeholder='Guess Rating'
              id='guess'
              type='number'
            ></input>
            <button
              data-action='increment'
              className='flex-none my-1 bg-pr-gray text-pr-black hover:bg-pr-yellow hover:text-pr-white h-full w-8 rounded-2xl cursor-pointer outline-none'
              onClick={increment}
            >
              <span className='m-auto text-2xl font-light'>+</span>
            </button>
            <button className='mx-6' onClick={handleGuess}>
              <SubmitBtn className='mx-6 w-20 sm:w-24 self-center hover:scale-105' />
            </button>
          </form>
        </div>
      </div>
      <RoundModal
        value={turnOn}
        closeRoundModal={closeRoundModal}
        loadMovieInfo={loadMovieInfo}
        rating={rating}
        score={score}
        guess={gg}
        round={round}
      />
      <PlayAgainModal
        value={turnOny}
        closePlayAgainModal={closePlayAgainModal}
        loadMovieInfo={loadMovieInfo}
        rating={rating}
        totalScore={totalScore}
        score={score}
        guess={gg}
        overallPoints={overallPoints}
      />
    </>
  );
}
export default GameContainer;
