import React from 'react';
import UserGreeting from '../components/UserGreeting';

export default function GamePage() {
  return (
    <div>
      <UserGreeting firstName={localStorage.user.firstName} />
    </div>
  );
}
