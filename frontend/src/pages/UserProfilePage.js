import { useState, useRef, useEffect } from 'react';

export default function UserProfilePage() {
  const auth = localStorage.getItem('user_data');
  const userData = JSON.parse(auth);
  const [isEditable, setIsEditable] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [score, setScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const matchingPass = useRef('');
  const storage = require('../tokenStorage.js');

  async function getUserStats() {
    const jwtToken = storage.retrieveToken();
    let obj = { login: userData.login, jwtToken: jwtToken };
    let js = JSON.stringify(obj);

    // let bp = require('./Paths.js');
    // 'https://cinema-guesser.herokuapp.com/api/login'
    // bp.buildPath('api/login')

    const response = await fetch(
      'https://cinema-guesser.herokuapp.com/api/get_stats',
      {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      }
    ).catch((error) => {
      console.error('Error:', error);
    });

    let res = await response.json();

    if (res.error && res.error !== '') return;

    // store JWT token here
    // storage.storeToken(res);
    
    setScore(res.score);
    setGamesPlayed(res.gamesPlayed);
  }

  useEffect(() => {
    getUserStats();
  }, []);

  function getUserInitials() {
    if (!auth) return '?';

    const userInitials =
      userData.firstName.substring(0, 1).toUpperCase() +
      userData.lastName.substring(0, 1).toUpperCase();

    return userInitials;
  }

  const handleFocus = (e) => {
    const input = e.target;
    input.setAttribute('focused', 'true');
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  function validateInputs() {
    if (firstName === '' || lastName === '') return false;

    if (!changePassword) return true;

    const confirmPass = matchingPass.current
      ? matchingPass.current.value
      : null;
    if (confirmPass !== password) return false;

    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;

    return regex.test(password);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditable(true);

    if (!validateInputs()) return;

    if (changePassword) setChangePassword(false);

    if (!isEditable) return;

    // Save button classes before hiding it.
    let className = e.target.className;
    e.target.className = 'hidden';

    // Set API request here

    if (true) setStatusMsg('Your profile has been updated!');

    setTimeout(() => {
      // Make button visible and reset its state
      e.target.className = className;
      setStatusMsg('');
      setIsEditable(false);
    }, 2000);
  }

  return (
    <div className='flex flex-col items-center'>
      <p className='text-center my-6 lg:my-16 text-2xl md:text-3xl xl:text-4xl text-pr-white font-bold'>
        Your Account
      </p>
      <div className='flex flex-col items-center w-[80%] min-w-fit max-w-sm min-h-[50%] p-8 rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
        <div className='flex-none flex justify-center items-center mb-9 bg-pr-yellow text-pr-white text-5xl md:text-6xl lg:text-8xl font-bold md:font-medium h-28 w-28 md:h-36 md:w-36 xl:h-48 xl:w-48 rounded-full border-2 border-pr-white'>
          <span>{auth ? getUserInitials() : '?'}</span>
        </div>
        <span className='mb-1 text-pr-white text-3xl'>{userData.login}</span>
        <span className='mb-1 text-pr-white text-lg'>email@email.com</span>
        <p className='mb-1 text-pr-white text-lg'>
          score:
          <span className='ml-2 mb-6 text-pr-yellow text-2xl'>{score}</span>
        </p>

        <form className='flex flex-col items-center w-[80%] min-w-fit max-w-sm'>
          <div className='mt-6'>
            <input
              className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-gray focus:text-pr-white text-lg focus:outline-none bg-transparent'
              id='firstname'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleFocus}
              focused='false'
              disabled={isEditable ? false : true}
              required
            ></input>
            <span className='text-orange-600 text-xs font-light peer-valid:hidden peer-disabled:hidden'>
              Empty Field!
            </span>
            <label
              className='block text-pr-yellow text-md self-start peer-focus:font-medium'
              htmlFor='firstname'
            >
              {isEditable ? 'Edit firstname' : 'Firstname'}
            </label>
          </div>
          <div className='mt-6'>
            <input
              className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-gray focus:text-pr-white text-lg focus:outline-none bg-transparent'
              id='lastname'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={handleFocus}
              focused='false'
              disabled={isEditable ? false : true}
              required
            ></input>
            <span className='text-orange-600 text-xs font-light peer-valid:hidden peer-disabled:hidden'>
              Empty Field!
            </span>
            <label
              className='block text-pr-yellow text-md self-start peer-focus:font-medium'
              htmlFor='lastname'
            >
              {isEditable ? 'Edit lastname' : 'Lastname'}
            </label>
          </div>
          {isEditable ? (
            <>
              <button
                className='flex justify-center items-center transition-all ease-in-out duration-300 hover:scale-110 active:scale-100 cursor-pointer mt-6 rounded-full bg-slate-700 text-white text-sm w-36 h-8 font-normal hover:font-extrabold'
                type='button'
                onClick={(e) => setChangePassword(!changePassword)}
              >
                Change Password
              </button>
              {changePassword ? (
                <>
                  <div className={'mt-6 self-center'}>
                    <input
                      className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-white text-lg focus:outline-none bg-transparent'
                      id='password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
                      onBlur={handleFocus}
                      focused='false'
                      required
                    ></input>
                    <span className='text-orange-600 w-52 text-xs font-light peer-valid:hidden peer-disabled:hidden'>
                      Must be 8-20 characters and contain 1 letter, 1 number, 1
                      special character!
                    </span>
                    <label
                      className='block text-pr-yellow text-md self-start peer-focus:font-medium'
                      htmlFor='password'
                    >
                      New password
                    </label>
                  </div>
                  <div className={'mt-6 self-center'}>
                    <input
                      className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-white text-lg focus:outline-none bg-transparent'
                      id='password'
                      type='password'
                      ref={matchingPass}
                      pattern={password}
                      onBlur={handleFocus}
                      focused='false'
                      required
                    ></input>
                    <span className='text-orange-600 w-52 text-xs font-light peer-valid:hidden peer-disabled:hidden'>
                      Password must match
                    </span>
                    <label
                      className='block text-pr-yellow text-md self-start peer-focus:font-medium'
                      htmlFor='password'
                    >
                      Repeat password
                    </label>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
          <span
            className={classNames(
              statusMsg === '' ? '' : 'my-12',
              ' text-pr-white text-md'
            )}
          >
            {statusMsg}
          </span>
          <button
            className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
            type='submit'
            onClick={(e) => handleSubmit(e)}
          >
            {isEditable ? 'Update' : 'Edit'}
          </button>
        </form>
        {isEditable ? (
          <button
            className='flex justify-center items-center transition-all ease-in-out duration-300 hover:scale-110 active:scale-100 mt-1 rounded-full bg-slate-700 text-white text-sm w-24 h-8 font-normal hover:font-extrabold'
            type='button'
            onClick={() => setIsEditable(false)}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
}
