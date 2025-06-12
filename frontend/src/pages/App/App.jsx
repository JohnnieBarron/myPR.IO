import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import ExerciseListPage from '../ExercisePage/ExercisePage'
import NewExercisesPage from '../NewExercisesPage/NewExercisesPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ShowExercise from '../ShowExercisePage/ShowExcercisePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import './App.css';



export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage 
            progress={user.progress}
            user={user}
            />} />
            <Route path="/exercises" element={<ExerciseListPage />} />
            <Route path="/exercises/new" element={<NewExercisesPage />} />
            <Route path="/exercises/:_id" element={<ShowExercise />} />
            <Route path="/users/:id" element={<ProfilePage />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    
    </main>
  );
}

