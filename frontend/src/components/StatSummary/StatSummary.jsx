import React from 'react';
import './StatSummary.css';

function StatSummary({ user, lastLoggedMeal, lastLoggedExercise, lastAchievement, lastWeight, lastWeightDate }) {
  return (
    <div className='StatSummary'>
      <h1 className='StatGreeting'>Hello {user.firstName}</h1>

      <p className='SummeryEntry'>
        🍽️ Last Logged Meal:{' '}
        {lastLoggedMeal ? new Date(lastLoggedMeal).toLocaleDateString() : 'No meals logged'}
      </p>

      <p className='SummeryEntry'>
        🏋️ Last Logged Exercise:{' '}
        {lastLoggedExercise ? new Date(lastLoggedExercise).toLocaleDateString() : 'No exercises logged'}
      </p>

      <p className='SummeryEntry'>
        🏆 Last Achievement Earned:{' '}
        {lastAchievement ? new Date(lastAchievement).toLocaleDateString() : 'No achievements yet'}
      </p>

      <p className='SummeryEntry'>
        ⚖️ Last Weight Entry:{' '}
        {lastWeightDate
          ? `${new Date(lastWeightDate).toLocaleDateString()})`
          : 'No weight logged'}
      </p>
    </div>
  );
}

export default StatSummary;