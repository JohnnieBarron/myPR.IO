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

  // Group exercises by name
  const groupedExercises = exercises.reduce((acc, exercise) => {
    const name = exercise.name;
    if (!acc[name]) acc[name] = [];
    acc[name].push(exercise);
    return acc;
  }, {});

  // Filtered + searched list
    const filteredGroupKeys = Object.keys(groupedExercises).filter((name) => {
    const sample = groupedExercises[name][0];
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      (filterCardio && sample.category === 'cardio') ||
      (filterResistance && sample.category === 'resistance');
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

      {/* Exercise Name List */}
      {filteredGroupKeys.length > 0 ? (
        <ul>
            {filteredGroupKeys.map((name) => {
                const firstExercise = groupedExercises[name][0]; 
                return (
                <li key={firstExercise._id}>
                    <button onClick={() => navigate(`/exercises/${firstExercise._id}`)}>
                    {name}
                    </button> ({groupedExercises[name].length} entries)
                </li>
                );
            })}
        </ul>
      ) : (
        <p>No exercises match your criteria.</p>
      )}

      {/* Add New Exercise Button */}
      <button onClick={() => navigate('/exercises/new')}>
        ➕ Add New Exercise
      </button>
    </div>
  );
}

export default ExerciseList;
