import { useState } from 'react';

export default function UserProfilePage() {
  const isEditable = useState(false);
  const auth = localStorage.getItem('user_data');
  const userData = JSON.parse(auth);

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

  return (
    <div className='flex flex-col items-center'>
      <p className='text-center my-6 lg:my-24 text-2xl md:text-3xl xl:text-4xl text-pr-white font-bold'>
        Your Account
      </p>
      <div className='flex flex-col items-center w-[80%] min-w-fit max-w-sm p-8 rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
        <div className='flex-none flex justify-center items-center mb-9 bg-pr-yellow text-pr-white text-5xl md:text-6xl lg:text-8xl font-bold md:font-medium h-28 w-28 md:h-36 md:w-36 xl:h-48 xl:w-48 rounded-full border-2 border-pr-white'>
          <span>{auth ? getUserInitials() : '?'}</span>
        </div>
        <span className='mb-1 text-pr-white text-3xl'>{userData.login}</span>
        <span className='mb-6 text-pr-yellow text-2xl'>456</span>
        <form
          className='relative flex flex-col items-center w-[80%] min-w-fit max-w-sm'
          onSubmit={null}
        >
          <div className='relative mt-6'>
            <input
              className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-pr-gray'
              id='firstname'
              ref={null}
              type='text'
              placeholder={userData.firstName}
              onBlur={handleFocus}
              focused='false'
              disabled
              required
            ></input>
            <span className='text-orange-600 text-xs peer-valid:hidden peer-disabled:hidden'>
              Empty Field!
            </span>
            <label
              className='block text-pr-yellow text-md self-start'
              htmlFor='firstname'
            >
              Firstname
            </label>
          </div>
          <div className='relative mt-6'>
            <input
              className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-pr-gray'
              id='lastname'
              ref={null}
              type='text'
              placeholder={userData.lastName}
              onBlur={handleFocus}
              focused='false'
              disabled
              required
            ></input>
            <span className='text-orange-600 text-xs peer-valid:hidden peer-disabled:hidden'>
              Empty Field!
            </span>
            <label
              className='block text-pr-yellow text-md self-start'
              htmlFor='lastname'
            >
              Lastname
            </label>
          </div>
          <div className='relative mt-6'>
            <input
              className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
              id='password'
              ref={null}
              type='password'
              placeholder='a'
              pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$'
              onBlur={null}
              focused='false'
              required
            ></input>
            <span className='text-pr-yellow text-xs w-52 peer-valid:hidden'>
              Must be 8-20 characters and contain 1 letter, 1 number, 1 special
              character!
            </span>
            <label
              className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
              htmlFor='password'
            >
              ●●●●●●●●
            </label>
          </div>
          <div className='relative mt-6'>
            <input
              className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
              id='email'
              ref={null}
              type='email'
              placeholder='a'
              pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
              onBlur={null}
              focused='false'
              required
            ></input>
            <span className='text-pr-yellow text-xs peer-valid:hidden'>
              Invalid Email!
            </span>
            <label
              className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
              htmlFor='email'
            >
              Email
            </label>
            <span className='block text-center mt-5 w-52 text-transparent bg-clip-text bg-gradient-to-l from-pr-yellow to-pr-red'>
              {null}
            </span>
          </div>

          <button
            className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
            type='submit'
          >
            Edit Profile
          </button>
        </form>
      </div>
    </div>
  );
}
