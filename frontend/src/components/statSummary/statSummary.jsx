import React, { useState } from 'react';

function StatSummary() {
  const [lastLoggedMeal, setLastLoggedMeal] = useState(0);
  const [lastLoggedExercise, setLastLoggedExercise] = useState(0);
  const [lastAchievement, setLastAchievement] = useState(0);

  return (
    <div>
      <h1>Hello from statSunnary</h1>
      <p>lastLoggedMeal PH</p>
      <p>lastLoggedExercise PH</p>
      <p>lastAchievement PH</p>
    </div>
  );
}

export default StatSummary;