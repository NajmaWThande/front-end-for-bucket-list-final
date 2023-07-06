import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ handleLogin }) => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not OK');
        }
      })
      .then((data) => {
        if (data.token) {
          handleLogin(data);
          navigate('/bucketlist');
        } else {
          setErrors(data.error);
        }
      })
      .catch((error) => console.log('login errors:', error));
  };

  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {errors && <div className="text-danger">{errors}</div>}
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Log In
        </button>

        <div className="mt-3">
          or <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
