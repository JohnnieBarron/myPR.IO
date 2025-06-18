import React from 'react';
import { useNavigate } from 'react-router';
import './LandingPage.css'

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to myPR.IO</h1>
      <p>Your journey to a healthier, stronger you starts here.</p>

     

      <section className="features">
        <h2>Why Choose myPR.IO?</h2>
        <ul>
          <li>🏋️ Track your exercises</li>
          <li>🍽️ Log meals and monitor nutrition</li>
          <li>🎯 Earn achievements and hit milestones</li>
          <li>📈 Visualize progress with smart insights</li>
        </ul>
      </section>
    </div>
  );
}

export default LandingPage;
