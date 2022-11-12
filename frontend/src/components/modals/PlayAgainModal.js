import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PlayAgainModal(props)
{
    console.log(props.value);
    const [modal, setModal] = useState(props.value);
    console.log(modal);
    const toggleModal = () =>
    {
        props.value = !props.value;
        // setModal(!modal);
    }
    return(
        <>

      {props.value && (
        <div className='overflow-x-scroll w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50'>
          <div
            onClick={toggleModal}
            className='w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-pr-black/70'
          ></div>
          <div className='absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] leading-loose bg-gray-900 px-4 sm:px-16 py-8 rounded-md w-4/5 max-w-5xl text-pr-white text-sm md:text-lg lg:text-xl'>
            <h2 className='text-pr-yellow text-center text-xl md:text-2xl lg:text-3xl'>
              Game Over
            </h2>
            <p className='mt-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              pharetra ante convallis ex pellentesque, id sodales ex
              scelerisque. Morbi et dictum turpis. Nullam congue, metus et
              vulputate egestas, est ex posuere neque, at eleifend dolor augue
              eu nulla. Curabitur mattis dapibus tortor ac feugiat. In
              scelerisque ut odio id congue. Etiam dolor risus, pharetra a neque
              placerat, eleifend venenatis enim. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Aliquam blandit urna vitae magna
              dapibus, id tincidunt nulla consectetur.
            </p>
            <button>
              k
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