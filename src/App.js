import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    loginStatus();
  }, []);

  const loginStatus = () => {
    fetch('http://localhost:3001/logged_in', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in) {
          handleLogin(data);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Add routes with the 'element' prop */}
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bucketlist" element={<Homepage/>} />
          {/* Add a default route to redirect to a specific route */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
