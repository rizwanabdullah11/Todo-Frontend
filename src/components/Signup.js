// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../redux/authSlice'; // Import your login action if you want to log the user in after signup
// import axios from 'axios';

// const SignUp = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/signup', {
//         username,
//         password,
//       });

//       const { token } = response.data;
//       // Store the token in local storage
//       localStorage.setItem('token', token);
//       dispatch(login({ username })); // Optional: Log the user in immediately after signup
//       navigate('/'); // Redirect to the homepage or any other page
//     } catch (error) {
//       console.error(error);
//       // Handle error (e.g., show a message to the user)
//       alert('User already exists or something went wrong. Please try again.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="auth-form">
//       <h2>Sign Up</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password,
      }, {
        withCredentials: true,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      dispatch(login({ username }));
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
      alert('User already exists or something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="text"
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
