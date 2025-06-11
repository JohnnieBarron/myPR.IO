import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as exerciseService from '../../services/exerciseServices';

function ShowExercise() {
  const { _id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [newProgress, setNewProgress] = useState({
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    distance: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    async function fetchExercise() {
      try {
        const data = await exerciseService.getById(_id);
        setExercise(data);
      } catch (err) {
        console.error('Error fetching exercise:', err);
      }
    }
    fetchExercise();
  }, [_id]);

  function handleProgressChange(e) {
    setNewProgress({ ...newProgress, [e.target.name]: e.target.value });
  }

  async function handleAddProgress(e) {
    e.preventDefault();
    try {
      const updatedExercise = await exerciseService.update(_id, {
        progress: [
          ...exercise.progress,
          {
            date: new Date(newProgress.date),
            sets: Number(newProgress.sets),
            reps: Number(newProgress.reps),
            weight: Number(newProgress.weight),
            duration: Number(newProgress.duration),
            distance: Number(newProgress.distance),
          },
        ]
      });
      setExercise(updatedExercise);
      setNewProgress({
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        distance: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error('Failed to add progress entry:', err);
    }
  }

  if (!exercise) return <p>Exercise not found.</p>;

  return (
    <div>
      <h1>{exercise.name}</h1>
      <p>Category: {exercise.category}</p>

      {exercise.progress && exercise.progress.length > 0 ? (
        <div>
          <h2>Progress Entries:</h2>
          <ul>
            {exercise.progress.map((entry, index) => (
              <li key={index}>
                <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                {exercise.category === 'resistance' && (
                  <>
                    <p>Sets: {entry.sets}</p>
                    <p>Reps: {entry.reps}</p>
                    <p>Weight: {entry.weight} lbs</p>
                  </>
                )}
                {exercise.category === 'cardio' && (
                  <>
                    <p>Duration: {entry.duration} min</p>
                    <p>Distance: {entry.distance} mi</p>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No progress entries available.</p>
      )}

      <h3>Add Progress Entry</h3>
      <form onSubmit={handleAddProgress}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newProgress.date}
          onChange={handleProgressChange}
        />
        {exercise.category === 'resistance' && (
          <>
            <label>Sets:</label>
            <input
              type="number"
              name="sets"
              value={newProgress.sets}
              onChange={handleProgressChange}
            />
            <label>Reps:</label>
            <input
              type="number"
              name="reps"
              value={newProgress.reps}
              onChange={handleProgressChange}
            />
            <label>Weight (lbs):</label>
            <input
              type="number"
              name="weight"
              value={newProgress.weight}
              onChange={handleProgressChange}
            />
          </>
        )}
        {exercise.category === 'cardio' && (
          <>
            <label>Duration (min):</label>
            <input
              type="number"
              name="duration"
              value={newProgress.duration}
              onChange={handleProgressChange}
            />
            <label>Distance (mi):</label>
            <input
              type="number"
              name="distance"
              value={newProgress.distance}
              onChange={handleProgressChange}
            />
          </>
        )}
        <button type="submit">Add Progress</button>
      </form>
    </div>
  );
}

export default ShowExercise;
