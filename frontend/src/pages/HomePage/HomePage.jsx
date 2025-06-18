import React, { useState, useEffect } from 'react';
import StatSummary from '../../components/StatSummary/StatSummary';
import CompTracker from '../../components/CompTracker/CompTracker';
import AchevementTracker from '../../components/AchevementTracker/AchevementTracker';
import * as exerciseService from '../../services/exerciseServices'; 
import { updateUserProgress } from '../../services/userServices';
import LandingPage from '../LandingPage/LandingPage';

export default function HomePage({ user }) {
  const [userData, setUserData] = useState(user);
  const [exercises, setExercises] = useState([]); 
  const userForAchievements = {
  ...userData,
  exercises,
  };


  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await exerciseService.index(); 
        setExercises(data);
      } catch (err) {
        console.error('Error fetching exercises:', err);
      }
    }
    fetchExercises();
  }, []);

  async function handleAddProgress(newEntry) {
    try {
      const updatedUser = await updateUserProgress(userData._id, newEntry);
      setUserData(updatedUser); 
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }

  function getLastExerciseDate(exercises) {
    let lastDate = null;
    for (const exercise of exercises) {
      for (const entry of exercise.progress) {
        if (!lastDate || new Date(entry.date) > new Date(lastDate)) {
          lastDate = entry.date;
        }
      }
    }
    return lastDate;
  }

  function getLastWeightEntry(exercises) {
    let lastEntry = null;
    for (const exercise of exercises) {
      for (const entry of exercise.progress) {
        if (entry.weight != null && (!lastEntry || new Date(entry.date) > new Date(lastEntry.date))) {
          lastEntry = entry;
        }
      }
    }
    return lastEntry;
  }

  const lastWeightEntry = getLastWeightEntry(exercises);
  const lastExerciseDate = getLastExerciseDate(exercises);

  return (
    <div className='HomePageContainer'>
      {user ? (
        <div>
          <StatSummary 
            user={user} 
            lastWeight={lastWeightEntry?.weight}
            lastWeightDate={lastWeightEntry?.date}
            lastLoggedExercise={lastExerciseDate}
          />
          <CompTracker />
          <AchevementTracker user={userForAchievements} />
        </div>
      ) : (
        <div>
        <LandingPage />
        </div>
      )}
    </div>
  );
}
