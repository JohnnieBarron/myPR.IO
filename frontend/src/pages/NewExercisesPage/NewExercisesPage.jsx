import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as exercisesService from '../../services/exerciseServices';

export default function NewExercisesPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('resistance');
  const [progress, setProgress] = useState([
    { sets: '', reps: '', weight: '', duration: '', distance: '' }
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  function handleProgressChange(index, field, value) {
    const updated = [...progress];
    updated[index][field] = value;
    setProgress(updated);
  }

  function addProgressEntry() {
    setProgress([...progress, { sets: '', reps: '', weight: '', duration: '', distance: '' }]);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await exercisesService.create({
        name,
        date,
        category,
        progress: progress.map(p => ({
          sets: Number(p.sets),
          reps: Number(p.reps),
          weight: Number(p.weight),
          duration: Number(p.duration),
          distance: Number(p.distance),
        }))
      });
      navigate('/exercises');
    } catch (err) {
      setErrorMsg('Adding Exercise Failed');
    }
  }

  return (
    <>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />

        <label>Date:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="cardio">Cardio</option>
          <option value="resistance">Resistance</option>
        </select>

        <h4>Progress</h4>
        {progress.map((entry, index) => (
          <div key={index}>
            {category === 'resistance' && (
              <>
                <label>Set:</label>
                <input
                  type="number"
                  value={entry.sets}
                  onChange={e => handleProgressChange(index, 'sets', e.target.value)}
                />
                <label>Reps:</label>
                <input
                  type="number"
                  value={entry.reps}
                  onChange={e => handleProgressChange(index, 'reps', e.target.value)}
                />
                <label>Weight:</label>
                <input
                  type="number"
                  value={entry.weight}
                  onChange={e => handleProgressChange(index, 'weight', e.target.value)}
                />
              </>
            )}
            {category === 'cardio' && (
              <>
                <label>Duration (minutes):</label>
                <input
                  type="number"
                  value={entry.duration}
                  onChange={e => handleProgressChange(index, 'duration', e.target.value)}
                />
                <label>Distance (miles):</label>
                <input
                  type="number"
                  value={entry.distance}
                  onChange={e => handleProgressChange(index, 'distance', e.target.value)}
                />
              </>
            )}
          </div>
        ))}
        <button type="button" onClick={addProgressEntry}>Add Another Entry</button>
        <br />
        <button type="submit">Add Exercise</button>
      </form>
      <p className="error-message">{errorMsg}</p>
    </>
  );
}
