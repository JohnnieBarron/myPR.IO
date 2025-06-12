import React, { useState } from 'react';
import StatSummary from '../../components/StatSummary/StatSummary';
import CompTracker from '../../components/CompTracker/CompTracker';
import AchevementTracker from '../../components/AchevementTracker/AchevementTracker';
import { updateUserProgress } from '../../services/userServices';

export default function HomePage({ user }) {
  const [userData, setUserData] = useState(user);

  async function handleAddProgress(newEntry) {
    try {
      const updatedUser = await updateUserProgress(userData._id, newEntry);
      setUserData(updatedUser); 
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <div>
          <StatSummary />
        </div>
        <div>
          {userData && userData.progress?.length > 0 ? (
            <CompTracker
              progress={userData.progress}
              onAddProgress={handleAddProgress}
            />
          ) : (
            <p>No progress data available.</p>
          )}
        </div>
        <div>
          <AchevementTracker user={userData} />
        </div>
      </div>
    </div>
  );
}
