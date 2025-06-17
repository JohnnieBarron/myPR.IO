import React, { useState, useEffect } from 'react';
import achievements from '../../data/achievements';
import './AchevementTracker.css';

function evaluateAchievement(achievement, user) {
  if (!user) return { ...achievement, unlocked: false, progress: 0 };

  const { exercises = [], meals = [], workouts = [] } = user;
  const allProgress = exercises.flatMap((ex) => ex.progress || []);

  const initialWeight = allProgress[0]?.weight ?? 0;
  const latestWeight = allProgress.at(-1)?.weight ?? 0;
  const weightLost = initialWeight - latestWeight;

  const initialBF = allProgress[0]?.bfPercent ?? 0;
  const latestBF = allProgress.at(-1)?.bfPercent ?? 0;
  const bfLost = initialBF - latestBF;

  const hasExercise = exercises.length > 0;
  const hasMeal = meals.length > 0;
  const hasWorkout = workouts?.length > 0;

  const checkStreak = (days) => {
    const dateSet = new Set();
    [...exercises, ...meals, ...workouts].forEach((item) => {
      const date = new Date(item.date).toDateString();
      dateSet.add(date);
    });

    let streak = 0;
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (dateSet.has(d.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak >= days;
  };

  const getMaxStrengthGain = () => {
    let maxGain = 0;
    const grouped = {};

    allProgress.forEach((entry) => {
      if (!entry.name || entry.weight == null) return;
      const name = entry.name.toLowerCase();
      grouped[name] = grouped[name] || [];
      grouped[name].push(entry.weight);
    });

    for (const name in grouped) {
      const weights = grouped[name];
      const min = Math.min(...weights);
      const max = Math.max(...weights);
      maxGain = Math.max(maxGain, max - min);
    }

    return maxGain;
  };

  const getBestMileTime = () => {
    const mileRuns = exercises.filter(
      (ex) => ex.type === 'cardio' && ex.distance >= 1 && ex.time
    );
    if (mileRuns.length === 0) return null;
    return Math.min(...mileRuns.map((r) => r.time));
  };

  const getLongestRun = () => {
    const runs = exercises.filter((ex) => ex.type === 'cardio' && ex.distance);
    if (runs.length === 0) return 0;
    return Math.max(...runs.map((r) => r.distance));
  };

  switch (achievement.id) {
    // Milestones
    case 'first-workout':
      return { ...achievement, unlocked: hasWorkout, progress: hasWorkout ? 1 : 0 };
    case 'first-meal':
      return { ...achievement, unlocked: hasMeal, progress: hasMeal ? 1 : 0 };
    case 'first-exercise':
      return { ...achievement, unlocked: hasExercise, progress: hasExercise ? 1 : 0 };

    // Streaks
    case '7-day-streak':
      return { ...achievement, unlocked: checkStreak(7), progress: checkStreak(7) ? 1 : 0.7 };
    case '30-day-streak':
      return { ...achievement, unlocked: checkStreak(30), progress: checkStreak(30) ? 1 : 0.3 };
    case '90-day-streak':
      return { ...achievement, unlocked: checkStreak(90), progress: checkStreak(90) ? 1 : 0.1 };

    // Weight Loss
    case 'lost-5-lbs':
    case 'lost-10-lbs':
    case 'lost-15-lbs':
    case 'lost-20-lbs':
    case 'lost-25-lbs':
    case 'lost-30-lbs': {
      const lbs = parseInt(achievement.id.match(/lost-(\d+)-lbs/)[1]);
      return {
        ...achievement,
        unlocked: weightLost >= lbs,
        progress: Math.min(weightLost / lbs, 1),
      };
    }

    // Body Fat %
    case 'lost-5-bf':
    case 'lost-10-bf':
    case 'lost-15-bf': {
      const bf = parseInt(achievement.id.match(/lost-(\d+)-bf/)[1]);
      return {
        ...achievement,
        unlocked: bfLost >= bf,
        progress: Math.min(bfLost / bf, 1),
      };
    }

    // Strength
    case 'gained-5-strength':
    case 'gained-10-strength':
    case 'gained-20-strength':
    case 'gained-30-strength': {
      const lbs = parseInt(achievement.id.match(/gained-(\d+)-strength/)[1]);
      const gain = getMaxStrengthGain();
      return {
        ...achievement,
        unlocked: gain >= lbs,
        progress: Math.min(gain / lbs, 1),
      };
    }

    // 1-Mile Time
    case '10-min-mile':
    case '9-min-mile':
    case '8-min-mile':
    case '7-min-mile':
    case '6-min-mile':
    case '5-min-mile': {
      const min = parseInt(achievement.id.match(/(\d+)-min-mile/)[1]);
      const best = getBestMileTime();
      return {
        ...achievement,
        unlocked: best != null && best <= min,
        progress: best != null ? Math.min((10 - best) / (10 - min), 1) : 0,
      };
    }

    // Run Distance
    default: {
      if (achievement.id.startsWith('run-')) {
        const match = achievement.name.match(/([\d.]+)\s(Mile|K|Marathon)/);
        const target = match ? parseFloat(match[1]) : 0;
        const longest = getLongestRun();
        return {
          ...achievement,
          unlocked: longest >= target,
          progress: Math.min(longest / target, 1),
        };
      }

      return { ...achievement, unlocked: false, progress: 0 };
    }
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
    <div className='ATracker'>
      <h1>Achievements</h1>
      <ul className="achievement-list">
        {sortedAchievements.map((ach) => (
          <li key={ach.id} className={ach.unlocked ? 'unlocked' : 'locked'}>
            {ach.unlocked ? '✅' : '🔒'} {ach.name}
            <div className="achievement-description">{ach.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AchievementTracker;
