import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    // The <Link> that was clicked will navigate to "/"
  }

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <NavLink to="/exercises" end>
            Exercises
          </NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/posts/new">Meals</NavLink>
          &nbsp;|&nbsp;
          <NavLink to={`/users/${user._id}`}>Welcome, {user.firstName}</NavLink>
          &nbsp; | &nbsp;
          <Link to="/" onClick={handleLogOut}>Log Out</Link>
        </>
      ) : (
        <>
          <NavLink to="/login">Log In</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}