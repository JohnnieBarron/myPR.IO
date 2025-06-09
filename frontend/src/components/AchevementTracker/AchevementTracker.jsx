import React, { useState, useEffect } from 'react';
import achievements from '../../data/achievements'; 

function evaluateAchievement(achievement, user) {
  if (!user) return { ...achievement, unlocked: false, progress: 0 };

  const { progress = [], exercises = [], meals = [] } = user;

  // Helper values
  const initialWeight = progress[0]?.weight ?? 0;
  const latestWeight = progress.at(-1)?.weight ?? 0;
  const weightLost = initialWeight - latestWeight;

  const initialBF = progress[0]?.bfPercent ?? 0;
  const latestBF = progress.at(-1)?.bfPercent ?? 0;
  const bfLost = initialBF - latestBF;

  const hasExercise = exercises.length > 0;
  const hasMeal = meals.length > 0;

  switch (achievement.id) {
    case 'first-workout':
      return { ...achievement, unlocked: hasExercise, progress: hasExercise ? 1 : 0 };

    case 'first-meal':
      return { ...achievement, unlocked: hasMeal, progress: hasMeal ? 1 : 0 };

    case 'first-exercise':
      return { ...achievement, unlocked: hasExercise, progress: hasExercise ? 1 : 0 };

    case 'lost-5-lbs':
      return { ...achievement, unlocked: weightLost >= 5, progress: weightLost / 5 };

    case 'lost-10-lbs':
      return { ...achievement, unlocked: weightLost >= 10, progress: weightLost / 10 };

    case 'lost-15-lbs':
      return { ...achievement, unlocked: weightLost >= 15, progress: weightLost / 15 };

    case 'lost-20-lbs':
      return { ...achievement, unlocked: weightLost >= 20, progress: weightLost / 20 };

    case 'lost-25-lbs':
      return { ...achievement, unlocked: weightLost >= 25, progress: weightLost / 25 };

    case 'lost-30-lbs':
      return { ...achievement, unlocked: weightLost >= 30, progress: weightLost / 30 };

    case 'lost-5-bf':
      return { ...achievement, unlocked: bfLost >= 5, progress: bfLost / 5 };

    case 'lost-10-bf':
      return { ...achievement, unlocked: bfLost >= 10, progress: bfLost / 10 };

    case 'lost-15-bf':
      return { ...achievement, unlocked: bfLost >= 15, progress: bfLost / 15 };

    //TODO Add more logic for strength and running milestones later

    default:
      return { ...achievement, unlocked: false, progress: 0 };
  }
}

function AchievementTracker({ user }) {
  const [sortedAchievements, setSortedAchievements] = useState([]);

  useEffect(() => {
    const evaluated = achievements.map((ach) => evaluateAchievement(ach, user));

    const unlocked = evaluated.filter((a) => a.unlocked);
    const locked = evaluated
      .filter((a) => !a.unlocked)
      .sort((a, b) => b.progress - a.progress);

    setSortedAchievements([...unlocked, ...locked]);
  }, [user]);

  return (
    <div>
      <h1>Achievements</h1>
      <ul>
        {sortedAchievements.map((ach) => (
          <li key={ach.id} style={{ fontWeight: ach.unlocked ? 'bold' : 'normal' }}>
            {ach.unlocked ? '✅' : '🔒'} {ach.name} — <span>{ach.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievementTracker;

