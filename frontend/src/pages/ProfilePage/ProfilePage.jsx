import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import * as userService from '../../services/userServices';

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await userService.getUserById(id);
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('User not found.');
      }
    }

    fetchUser();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>{user.firstName} {user.lastName}'s Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Height: {user.height} inches</p>
      <p>Gender: {user.gender}</p>
      <p>Level: {user.level || 'N/A'}</p>
      <p>EXP: {user.exp || 0}</p>
    </div>
  );
}

export default ProfilePage;
