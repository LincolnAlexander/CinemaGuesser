import React from 'react';
import LoginContainer from "../components/LoginContainer";

function LoginPage() {
  return (
    <div>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome to CinemaGuesser!
        </p>
        <p className="text-gray-500 text-lg">
          React and Tailwind CSS in action
        </p>


      </div>
      <LoginContainer />
    </div>



  );
};

export default LoginPage;