import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
   
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <h2>Sign Up!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <label>Height (in inches)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            min="0"
          />
        <label>weight (in pounds)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            min="0"
          />
        <label>Body Fat</label>
          <input
            type="number"
            name="bfPercent"
            value={formData.bfPercent}
            onChange={handleChange}
            required
            min="0"
            max="100"
            step="0.1"
          />
        <label>Gender</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirm</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}