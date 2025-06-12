import React, { useState } from 'react';
import './StatSummary.css';

function StatSummary({ user }) {
  const [lastLoggedMeal, setLastLoggedMeal] = useState(0);
  const [lastLoggedExercise, setLastLoggedExercise] = useState(0);
  const [lastAchievement, setLastAchievement] = useState(0);

  return (
    <div className='StatSummary'>
      <h1 className='StatGreeting'>Hello {user.firstName }</h1>
      <p className='SummeryEntry'>lastLoggedMeal PH</p>
      <p className='SummeryEntry'>lastLoggedExercise PH</p>
      <p className='SummeryEntry'>lastAchievement PH</p>
    </div>
  );
}

export default StatSummary;