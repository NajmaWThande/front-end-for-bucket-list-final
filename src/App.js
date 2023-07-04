import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter,  Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    axios
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log('api errors:', error));
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Route>
            {/* Add components for each route */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
