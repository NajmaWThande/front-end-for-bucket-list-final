import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import BucketListPage from './components/BucketListPage';
import PieChart from './components/PieChart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUser(sessionStorage.getItem('userId'));
    }
  };
  
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user.id);
    const token = data.token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', data.user.id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('token');
  
    fetch('http://localhost:3001/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Logged out successfully
      })
      .catch((error) => console.log('API error:', error));
  };
  
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/bucketlist" className="nav-link">Bucket List</Link>
            </li>
            <li className="nav-item">
              <Link to="/piechart" className="nav-link">Stats</Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-secondary ml-auto" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn btn-primary ml-auto">Login</Link>
          )}
        </nav>

        <Routes>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn ? (
            <Route path="/bucketlist" element={<BucketListPage user={user} />} />
          ) : (
            <Route path="/bucketlist" element={<Navigate to="/login" />} />
          )}
          <Route path="/piechart" element={<PieChart />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
