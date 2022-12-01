import { useState, useRef } from 'react';

export default function UserProfilePage() {
  const auth = localStorage.getItem('user_data');
  const userData = JSON.parse(auth);
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [password, setPassword] = useState('Password');
  const [statusMsg, setStatusMsg] = useState('');

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

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditable(!isEditable);
    console.log('here');
    if (!isEditable) return;

    let className = e.target.className;

    e.target.className = 'hidden';

    if (true) setStatusMsg('Your profile has been updated!');

    setTimeout(() => {
      e.target.className = className;
      setStatusMsg('');
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
        <span className='mb-6 text-pr-yellow text-2xl'>456</span>

        <form className='flex flex-col items-center w-[80%] min-w-fit max-w-sm'>
          <div className='mt-6'>
            <input
              className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-white text-lg focus:outline-none bg-transparent'
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
              className='block text-pr-yellow text-md self-start'
              htmlFor='firstname'
            >
              Firstname
            </label>
          </div>
          <div className='mt-6'>
            <input
              className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-white text-lg focus:outline-none bg-transparent'
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
              className='block text-pr-yellow text-md self-start'
              htmlFor='lastname'
            >
              Lastname
            </label>
          </div>
          <div className={isEditable ? 'mt-6 self-center' : 'hidden'}>
            <input
              className='peer h-10  border-b border-pr-yellow focus:border-b-2 focus:border-pr-white text-pr-white text-lg focus:outline-none bg-transparent'
              id='password'
              type='password'
              pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
              onBlur={handleFocus}
              focused='false'
              required
            ></input>
            <span className='text-orange-600 w-52 text-xs font-light peer-valid:hidden peer-disabled:hidden'>
              Must be 8-20 characters and contain 1 letter, 1 number, 1 special
              character!
            </span>
            <label
              className='block text-pr-yellow text-md self-start'
              htmlFor='password'
            >
              Password
            </label>
          </div>
          <span
            className={classNames(
              statusMsg === '' ? '' : 'mt-16',
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
      </div>
    </div>
  );
}
