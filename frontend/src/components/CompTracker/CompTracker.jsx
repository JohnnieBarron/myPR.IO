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

function CompTracker({progress}) {
  const chartData = progress.map(({ date, weight, bfPercent }) => ({
    date: new Date(date).toLocaleDateString(),
    weight,
    bfPercent,
  }));
 

  return (
    <div>
      <h2>Body Composition</h2>
       <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (lbs)" />
          <Line type="monotone" dataKey="bfPercent" stroke="#82ca9d" name="Body Fat (%)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompTracker;