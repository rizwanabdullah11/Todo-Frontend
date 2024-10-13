import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import axios from 'axios';

const SignIn = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        username,
        password,
      });
      
      const { token } = response.data;
  
      localStorage.setItem('token', token);
      dispatch(login({ username })); // Adjusted for your authSlice
      navigate('/'); // Redirect to the homepage or any other page
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message to the user)
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign In</h2>
      <input
        type="text" // Changed to text for username
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
