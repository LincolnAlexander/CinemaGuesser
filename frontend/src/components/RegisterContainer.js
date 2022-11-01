import React, {useState, useRef} from "react";

function RegisterContainer()
{
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const loginNameRef = useRef();
    const loginPasswordRef = useRef();
    const emailRef = useRef()
    return(
        
        <div className='flex justify-center mt-20'>
            <div className='flex justify-center items-start w-2/5'>
                <div className='flex flex-col basis-1/2 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
                    <form className='relative m-10'>
                        <div className='flex flex-col w-full'>
                            <div className = 'relative w-full'>
                                <input
                                    className='peer h-10  border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent mr-4'
                                    id='firstname'
                                    ref={firstNameRef}
                                    type='text'
                                    placeholder='a'
                                    ></input>
                                    <label
                                    className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                                    htmlFor='firstname'
                                    >
                                    First Name
                                </label>
                            </div>
                            <div className="relative mt-10 w-full">
                                <input
                                    className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                                    id='lastname'
                                    ref={lastNameRef}
                                    type='text'
                                    placeholder='a'
                                    ></input>
                                    <label
                                    className='absolute left-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                                    htmlFor='lastname'
                                    >
                                    Last Name
                                </label>
                            </div>
                            <div className='relative w-full mt-10'>
                            <input
                                    className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                                    id='username'
                                    ref={loginNameRef}
                                    type='text'
                                    placeholder='a'
                                    ></input>
                                    <label
                                    className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                                    htmlFor='username'
                                    >
                                    Login
                                </label>
                            </div>
                            <div className='relative w-full mt-10'>
                            <input
                                    className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                                    id='password'
                                    ref={loginPasswordRef}
                                    type='password'
                                    placeholder='a'
                                    ></input>
                                    <label
                                    className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                                    htmlFor='password'
                                    >
                                    Password
                                </label>
                        </div>
                        <div className='relative w-full mt-10'>
                            <input
                                    className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                                    id='email'
                                    ref={loginNameRef}
                                    type='email'
                                    placeholder='a'
                                    ></input>
                                    <label
                                    className='absolute left-0 -top-3.5  text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                                    htmlFor='email'
                                    >
                                    Email
                                </label>
                        </div>
                             
                            
                
                

                        </div>
                        
                        
                        
                        <div>
                        <button
                  className='transition-all ease-in-out delay-150 duration-300 hover:scale-110 block my-6 rounded-full bg-gradient-to-r from-pr-yellow to-pr-red  text-white w-52 h-10 font-medium hover:font-extrabold '
                  type='submit'
                  
                >
                  Register
                </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
export default RegisterContainer;