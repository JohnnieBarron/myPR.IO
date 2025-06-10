import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as exerciseService from '../../services/exerciseServices';

function ShowExercise() {
  const { _id } = useParams();
  const [exercise, setExercise] = useState(null);

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

  if (!exercise) return <p>Exercise not found.</p>;

  return (
    <div>
      <h1>{exercise.name}</h1>
      <p>Category: {exercise.category}</p>
      <p>Date: {new Date(exercise.date).toLocaleDateString()}</p>

      {exercise.progress && exercise.progress.length > 0 ? (
        <div>
          <h2>Progress Entries:</h2>
          <ul>
            {exercise.progress.map((entry, index) => (
              <li key={index}>
                {exercise.category === 'resistance' && (
                  <>
                    {entry.sets != null && <p>Sets: {entry.sets}</p>}
                    {entry.reps != null && <p>Reps: {entry.reps}</p>}
                    {entry.weight != null && <p>Weight: {entry.weight} lbs</p>}
                  </>
                )}

                {exercise.category === 'cardio' && (
                  <>
                    {entry.duration != null && <p>Duration: {entry.duration} min</p>}
                    {entry.distance != null && <p>Distance: {entry.distance} mi</p>}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No progress entries available.</p>
      )}
    </div>
  );
}

export default ShowExercise;

