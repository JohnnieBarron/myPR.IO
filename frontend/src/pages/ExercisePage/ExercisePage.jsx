import { useState, useEffect } from 'react';
import * as exerciseService from '../../services/exerciseServices';
import ExerciseList from '../../components/ExerciseList/ExcersiseList';

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
    
    <ExerciseList />
  </>
);
}