import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: []
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, password_confirmation } = userData;

    const user = {
      name,
      email,
      password,
      password_confirmation
    };

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('Network response was not OK');
        }
      })
      .then((data) => {
        if (data.name) {
          navigate('/login');
        } else {
          setUserData((prevUserData) => ({
            ...prevUserData,
            errors: data.errors
          }));
        }
      })
      .catch((error) => console.log('Signup errors:', error));
  };

  const renderErrors = () => {
    return (
      <div>
        <ul>
          {userData.errors}
        </ul>
      </div>
    );
  };

  const { name, email, password, password_confirmation } = userData;

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
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
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <div>
          or <Link to="/login">Log In</Link>
        </div>
      </form>
      {renderErrors()}
    </div>
  );
};

export default Signup;
