import React, { Component } from 'react';
import {BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import './Home.css';
import SignUpForm from './pages/SignUpForm'; //sign up form page component
import SignInForm from './pages/SignInForm'; //sign in form page component
import Home from './pages/Home'; // homepage

class App extends Component {
  render() {
    return (

      // wrap everything int router here
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

        {/* <div className="Home">
          <div className ="HomeHeader">
            
          <header>
          <h2>VIEWS</h2>
          </header>

          <section>
            <nav>
              <ul>
                <li><a href="#">Project 1</a></li>
                <li><a href="#">Project 2</a></li>
                <li><a href="#">Project 3</a></li>
              </ul>
            </nav>
  
 

          <footer>
            <p>Footer</p>
          </footer>
          </section>

          </div>
        </div> */}

      </div>

      
      {/* The home page div with route */}
      {/* <Route exact path="/main" component={Home}>
      
        <div className="HomePage">
          <Route path="/main" component={Home}></Route>
        </div>
      </Route> */}

      </Router> 
    );
  }
}

export default App;
