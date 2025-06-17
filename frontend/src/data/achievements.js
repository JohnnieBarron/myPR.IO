const achievements = [
  // First-Time Achievements
  {
    id: 'first-meal',
    name: 'First Meal Logged',
    description: 'Log your first meal in the app.',
    type: 'milestone',
  },
  {
    id: 'first-exercise',
    name: 'First Exercise Logged',
    description: 'Log your first exercise.',
    type: 'milestone',
  },

  // Streak Achievements
  {
    id: '7-day-streak',
    name: '7 Day Streak',
    description: 'Log at least one workout, one meal, and one exercise each day for 7 consecutive days.',
    type: 'streak',
  },
  {
    id: '30-day-streak',
    name: '30 Day Streak',
    description: 'Maintain your daily logging streak for 30 consecutive days.',
    type: 'streak',
  },
  {
    id: '90-day-streak',
    name: '90 Day Streak',
    description: 'Maintain your daily logging streak for 90 consecutive days.',
    type: 'streak',
  },

  // Weight Loss Achievements
  ...[5, 10, 15, 20, 25, 30].map((pounds) => ({
    id: `lost-${pounds}-lbs`,
    name: `Lost ${pounds} lbs`,
    description: `Lose a total of ${pounds} pounds from your starting weight.`,
    type: 'progress',
  })),

  // Body Fat Percentage Achievements
  ...[5, 10, 15].map((percent) => ({
    id: `lost-${percent}-bf`,
    name: `${percent}% Body Fat Loss`,
    description: `Reduce your body fat percentage by ${percent}%.`,
    type: 'progress',
  })),

  // Strength Gain Achievements
  ...[5, 10, 20, 30].map((lbs) => ({
    id: `gained-${lbs}-strength`,
    name: `+${lbs} lbs Strength`,
    description: `Increase the weight of a resistance exercise by ${lbs} lbs.`,
    type: 'resistance',
  })),

  // Running Pace Achievements (1 Mile)
  ...[10, 9, 8, 7, 6, 5].map((minutes) => ({
    id: `${minutes}-min-mile`,
    name: `${minutes} Minute Mile`,
    description: `Run a mile in under ${minutes} minutes.`,
    type: 'cardio',
  })),

  // Running Distance Achievements
  ...[
    { distance: 1, label: '1 Mile' },
    { distance: 2, label: '2 Mile' },
    { distance: 3, label: '3 Mile' },
    { distance: 5, label: '5 Mile' },
    { distance: 3.1, label: '5K' },
    { distance: 13.1, label: 'Half Marathon' },
    { distance: 26.2, label: 'Marathon' },
  ].map(({ distance, label }) => ({
    id: `run-${label.replace(/\s+/g, '-').toLowerCase()}`,
    name: `${label} Run`,
    description: `Run a total of ${distance} miles in a single session.`,
    type: 'cardio',
  })),
];


export default achievements;