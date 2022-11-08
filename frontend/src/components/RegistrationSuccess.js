import { useNavigate } from 'react-router-dom';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 3000);

  return (
    <h1 className='mt-52 mx-1 text-pr-yellow font-bold text-center text-xl'>
      Registration Successful!
      <br />
      Next, please login.
    </h1>
  );
}
