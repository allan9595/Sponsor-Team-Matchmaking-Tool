import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import  setAuthToken  from './utils/setAuthToken';
import {BrowserRouter as Router, Route, NavLink, Link, Switch } from 'react-router-dom';
import './App.css';

import SignUpForm from './components/auth/SignUpForm'; //sign up form page component
import SignInForm from './components/auth/SignInForm'; //sign in form page component


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
            <NavLink to ="/sign-in" activeClassName = "PageToggle_Item--Active" className="PageToggle_Item ">Sign In</NavLink>
            <NavLink exact to ="/" activeClassName = "PageToggle_Item--Active" className="PageToggle_Item"> Sign Up</NavLink>
          </div>

          {/* Title of form -- inside form div */}
          <div className="FormTitle">
            <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" 
            activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
          </div>

          {/* Form contents -- inside form div */}
          {/* {Routed} -- component is imported */}
          <Route exact path="/"  component={SignUpForm}></Route>

          {/* Route to sign in */}
          <Route path="/sign-in" component={SignInForm}></Route>

        </div>

          

        </div>

        


        </Router> 
      </Provider>
    );
  }
}

export default App;
