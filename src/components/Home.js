import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>The BucketList</h1>
          <Link to="/login" className="btn btn-primary mr-2">Log In</Link>
          <Link to="/signup" className="btn btn-success">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
