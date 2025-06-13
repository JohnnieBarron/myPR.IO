import { useState, useEffect } from 'react';
import './CompTracker.css';
import * as weightService from '../../services/weightService';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function CompTracker() {
  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState('');
  const [bfPercent, setBfPercent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchWeights() {
      try {
        const data = await weightService.index();
        setWeights(data);
      } catch (err) {
        console.error('Failed to load weights:', err);
        setError('Could not fetch weight history.');
      }
    }

    fetchWeights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const weightNum = parseFloat(weight);
    const bfNum = parseFloat(bfPercent);

    if (isNaN(weightNum) || isNaN(bfNum)) {
      setError('Please enter valid numbers for both weight and body fat %.');
      return;
    }

    const newEntry = {
      date: new Date().toISOString(),
      weight: weightNum,
      bodyfat: bfNum,
    };

    try {
      const savedEntry = await weightService.create(newEntry);
      setWeights((prev) => [savedEntry, ...prev]);
      setSuccess('Progress logged!');
      setError('');
      setWeight('');
      setBfPercent('');
    } catch (err) {
      console.error(err);
      setError('Failed to log progress.');
      setSuccess('');
    }
  };

  const chartData = weights.map(({ date, weight, bodyfat }) => ({
    date: new Date(date).toISOString(),
    weight,
    bfPercent: bodyfat,
  }));

  return (
    <div className="CompTrackerContainer">
      <h2>Body Composition</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) =>
              new Date(str).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(str) =>
              new Date(str).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#00FFFF"
            strokeWidth={2}
            dot={{ stroke: '#00FFFF', strokeWidth: 2, r: 3 }}
            name="Weight (lbs)"
          />
          <Line
            type="monotone"
            dataKey="bfPercent"
            stroke="#FF073A"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={{ stroke: '#FF073A', strokeWidth: 2, r: 3 }}
            name="Body Fat (%)"
          />
        </LineChart>
      </ResponsiveContainer>

      <form className="CompTrackerForm" onSubmit={handleSubmit}>
        <div className="ComptrackerInputs">
          <div>
            <label>Weight (lbs):</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>Body Fat (%):</label>
            <input
              type="number"
              step="0.1"
              value={bfPercent}
              onChange={(e) => setBfPercent(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Log update</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default CompTracker;
