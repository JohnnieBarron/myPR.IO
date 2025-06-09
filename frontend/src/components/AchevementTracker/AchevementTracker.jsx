import React, { useState, useEffect } from 'react';

function AchievementTracker({ achievements }) {
  const [sortedAchievements, setSortedAchievements] = useState([]);

  useEffect(() => {
    if (!achievements || !achievements.length) return;

    
    const unlocked = achievements.filter(a => a.unlocked);
    const locked = achievements
      .filter(a => !a.unlocked)
      .sort((a, b) => b.progress - a.progress); 

    
    setSortedAchievements([...unlocked, ...locked]);
  }, [achievements]);

  return (
    <div>
      <h1>Recent Achievements</h1>
      {sortedAchievements.map((ach, idx) => (
        <div
          key={idx}
          style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: ach.unlocked ? '#d4edda' : '#f8d7da',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <h3>{ach.title}</h3>
          <p>{ach.description}</p>
          <p>Status: {ach.unlocked ? 'Unlocked' : `${ach.progress}% complete`}</p>
        </div>
      ))}
    </div>
  );
}

export default AchievementTracker;
