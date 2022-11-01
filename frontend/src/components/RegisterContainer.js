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
            <div className='flex justify-center items-start w-1/2'>
                <div className='flex flex-col basis-1/2 justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
                    <form className='relative mt-10'>
                        <div className='flex flex-row'>
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
                            {/* <input
                  className='peer h-10 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent placeholder-transparent'
                  id='lastname'
                  ref={lastNameRef}
                  type='password'
                  placeholder='a'
                ></input>
                <label
                  className='absolute right-0 -top-3.5 text-pr-yellow text-md transtion-all peer-placeholder-shown:text-base peer-placeholder-shown:text-pr-gray peer-placeholder-shown:top-2 peer-focus: -top-3.5  peer-focus: text-md '
                  htmlFor='lastname'
                >
                  Last Name
                </label> */}
                
                

                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
export default RegisterContainer;