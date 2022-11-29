import { useNavigate } from 'react-router-dom';

export default function EmailCheck() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className='cursor-pointer mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'
    >
      <p>A registration link has been sent to your email! </p>
      <p>Click here to return to login page.</p>
    </div>
  );
}
