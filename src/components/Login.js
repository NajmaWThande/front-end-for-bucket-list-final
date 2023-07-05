import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
     if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const user = {
      email: email,
      password: password
    };
  
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not OK');
        }
      })
      .then((data) => {
        console.log(data);
        if (data.name) {
          // Perform any necessary actions after successful login
          // For example, update app state, set authentication token, etc.
          // You can also store the user details in the state or context for future reference
  
          // Example action: Set user as logged in
         handleLogin(data);
  
          // Redirect or navigate to a protected route
          navigate('/bucketlist');
        } else {
          setErrors(data.error);
        }
      })
      .catch((error) => console.log('login errors:', error));
  };
  
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
        {errors}
        </div>
        
  
        <input
          placeholder="email"
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <input
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <button type="submit"> Log In </button>
        <div> or <Link to="/signup">sign up</Link></div>
      </form>
    </div>
  );
};

export default Login;
