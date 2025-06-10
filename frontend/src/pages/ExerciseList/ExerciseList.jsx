import { useState, useEffect } from 'react';
import * as exerciseService from '../../services/exerciseServices';

export default function ExerciseListPage() {
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    async function fetchExercise() {
      const exercise = await exerciseService.index();
      setExercise(exercise);
    }
    fetchExercise();
  }, []);

  return (
  <>
    <h1>Exercise List</h1>
    <ul>
      {exercise.map((ex, index) => (
        <li key={index}>
          {ex.name} — {ex.category} on {new Date(ex.date).toLocaleDateString()}
        </li>
      ))}
    </ul>
  </>
);
}