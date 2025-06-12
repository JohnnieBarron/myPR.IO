import React, { useState } from 'react';
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

function CompTracker({ progress = [], onAddProgress }) {
  

  const chartData = progress.map(({ date, weight, bfPercent }) => ({
    date: new Date(date).toISOString(),
    weight,
    bfPercent,
  }));

  const [weight, setWeight] = useState('');
  const [bfPercent, setBfPercent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
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
      bfPercent: bfNum,
    };

    if (onAddProgress) {
      onAddProgress(newEntry);
    }

    setWeight('');
    setBfPercent('');
    setError('');
    setSuccess('Progress logged!');
  };

  return (
    <div>
      <h2>Body Composition</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) =>
              new Date(str).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            }
          />
          <YAxis />
          <Tooltip
            labelFormatter={(str) =>
              new Date(str).toLocaleString([], {
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
            stroke="#8884d8"
            name="Weight (lbs)"
          />
          <Line
            type="monotone"
            dataKey="bfPercent"
            stroke="#82ca9d"
            name="Body Fat (%)"
          />
        </LineChart>
      </ResponsiveContainer>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div>
          <label>Weight (lbs): </label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Body Fat (%): </label>
          <input
            type="number"
            step="0.1"
            value={bfPercent}
            onChange={(e) => setBfPercent(e.target.value)}
          />
        </div>
        <button type="submit">Add Progress</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
    </div>
  );
}

export default CompTracker;
