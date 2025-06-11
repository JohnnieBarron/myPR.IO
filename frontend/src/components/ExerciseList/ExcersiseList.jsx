import { useState, useEffect } from 'react';
import * as exerciseService from '../../services/exerciseServices';
import { useNavigate } from 'react-router';

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

  // Filter by search + category
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      (filterCardio && exercise.category === 'cardio') ||
      (filterResistance && exercise.category === 'resistance');
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Exercise List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filters */}
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

      {/* List of Exercises */}
      {filteredExercises.length > 0 ? (
        <ul>
          {filteredExercises.map((exercise) => (
            <li key={exercise._id}>
              <button onClick={() => navigate(`/exercises/${exercise._id}`)}>
                {exercise.name}
              </button>{' '}
              ({exercise.category}, {new Date(exercise.progress[0]?.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises match your criteria.</p>
      )}

      {/* Add New Exercise */}
      <button onClick={() => navigate('/exercises/new')}>➕ Add New Exercise</button>
    </div>
  );
}

export default ExerciseList;
