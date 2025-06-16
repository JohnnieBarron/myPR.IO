import { useState, useEffect } from 'react';
import * as exerciseService from '../../services/exerciseServices';
import { useNavigate } from 'react-router';
import './ExerciseList.css';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCardio, setFilterCardio] = useState(true);
  const [filterResistance, setFilterResistance] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await exerciseService.index();
        setExercises(data);
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      }
    }
    fetchExercises();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this exercise?');
    if (!confirmed) return;

    try {
      await exerciseService.remove(id);
      setExercises(prev => prev.filter(ex => ex._id !== id));
    } catch (err) {
      console.error('Failed to delete exercise:', err);
    }
  }

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      (filterCardio && exercise.category === 'cardio') ||
      (filterResistance && exercise.category === 'resistance');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='ExerciseList'>
      <h1>Exercise Log</h1>

      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <label>
          <input
            type="checkbox"
            checked={filterCardio}
            onChange={() => setFilterCardio(!filterCardio)}
          />
          Cardio
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterResistance}
            onChange={() => setFilterResistance(!filterResistance)}
          />
          Resistance
        </label>
      </div>

      <div className='ELIST'>
        {filteredExercises.length > 0 ? (
          <ul>
            {filteredExercises.map((exercise) => (
              <li className='ELI' key={exercise._id}>
                <button onClick={() => navigate(`/exercises/${exercise._id}`)}>
                  {exercise.name}
                </button>{' '}
                ({exercise.category},{' '}
                {new Date(exercise.progress[0]?.date).toLocaleDateString()})
                <button className='EDELETE' onClick={() => handleDelete(exercise._id)}>🗑️ Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises match your criteria.</p>
        )}
      </div>

      <button onClick={() => navigate('/exercises/new')}>➕ Add New Exercise</button>
    </div>
  );
}

export default ExerciseList;
