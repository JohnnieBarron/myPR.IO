import StatSummary from '../../components/statSummary/statSummary';
import CompTracker from '../../components/CompTracker/CompTracker';
import AchevementTracker from '../../components/AchevementTracker/AchevementTracker';

export default function HomePage({progress, user}) {
  return (
    <div>
     <h1>Home Page</h1>
      <div>
        <div>
          <StatSummary />
        </div>
        <div>
         {user && user.progress ? (
          <CompTracker progress={user.progress} />
            ) : (
           <p>No progress data available.</p>
          )}
        </div>
        <div>
          <AchevementTracker user={user} />
        </div>
      </div>
    </div>
);
}