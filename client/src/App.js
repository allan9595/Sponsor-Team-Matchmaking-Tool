import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken  from './utils/setAuthToken';
import DashboardSponsor from './components/dashboard/DashboardSponsor';
import DashboardProfessor from './components/dashboard/DashboardProfessor';
import {BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import './App.css';

import SignUpForm from './components/auth/SignUpForm'; //sign up form page component
import SignInForm from './components/auth/SignInForm'; //sign in form page component



//check for token
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);

  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //set user and isAuthenticated

  store.dispatch(setCurrentUser(decoded));
 
  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
      //todo clear current user profile
      //redirect to login
      window.location.href= "/login";

  }

}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        {/*wrap everything int router here*/}
        <Router>
          <div className="App">
              {/* Title Box -> just rando box for logo(?) */}
              <div className="Title_Box">
                <h1>Welcome to MatchMe</h1>
              </div>
              {/* Box for Form -> The right side of the screen with form */}
              <div className="Title_Form">
              {/* switch for Sign In/Up -- inside form div */}
              <div className="PageToggle">
                <NavLink to ="/login" activeClassName = "PageToggle_Item--Active" className="PageToggle_Item ">Sign In</NavLink>
                <NavLink exact to ="/signup" activeClassName = "PageToggle_Item--Active" className="PageToggle_Item"> Sign Up</NavLink>
              </div>
              {/* Title of form -- inside form div */}
              <div className="FormTitle">
                <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> 
                or 
                <NavLink exact to="/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>
              {/* Form contents -- inside form div */}
              {/* {Routed} -- component is imported */}
              <Route exact path="/signup"  component={SignUpForm}></Route>
              {/* Route to sign in */}
              <Route path="/login" component={SignInForm}></Route>
              <div className="container body">
              <Switch>
                  <PrivateRoute exec path = "/sponsor"  component={ DashboardSponsor } />
              </Switch>
              <Switch>
                  <PrivateRoute exec path = "/professor"  component={ DashboardProfessor } />
              </Switch>
                
              </div>
            </div> 
          </div>
        </Router> 
      </Provider>
    );
  }
}

export default App;
