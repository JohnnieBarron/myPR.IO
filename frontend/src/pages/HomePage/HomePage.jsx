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
      <div className='HomePageContainer'>
        {user ? (
          <div>
            <div>
              <StatSummary user={user} />
            </div>
            <div>
              <CompTracker />
            </div>
            <div>
              <AchevementTracker user={userData} />
            </div>
          </div>
        ) : (
          <p>Please log in to view your dashboard.</p>
        )}
      </div>
    );
}