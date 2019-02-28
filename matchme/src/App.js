import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (

      // wrap everything int router here
      <Router>
      <div className="App">
        
        {/* Title Box -> just rando box for logo(?) */}
        <div className="Title_Box">
          <h1> Welcome to MatchMe</h1>
        </div>

        {/* Box for Form -> The right side of the screen with form */}
        <div className="Title_Form">
        
          {/* switch for Sign In/Up -- inside form div */}
          <div className="PageToggle">
            <a href="#" className="PageToggle_Item ">Sign In</a>
            <a href="#" className="PageToggle_Item PageToggle_Item--Active"> Sign Up</a>
          </div>

          {/* Title of form -- inside form div */}
          <div className="FormTitle">
            <Link to="/sign-in" className="FormTitle__Link">Sign In</Link> or <a href="#" className="FormTitle__Link FormTitle__Link--Active">Sign Up</a>
          </div>

          {/* Form contents -- inside form div */}
          {/* {Routed} */}
          <Route exact path="/">
          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>

              {/* Name */}
              <div className="Formfield">
              <label className="FormField__Label" htmlFor="name">Full Name</label>
              <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name"/>
              </div>
              <br></br>

              {/* email */}
              <div className="Formfield">
              <label className="FormField__Label" htmlFor="email">E-Mail</label>
              <input type="text" id="email" className="FormField__Input" placeholder="Enter your e-mail address" name="email"/>
              </div>
              <br></br>

              {/* password */}
              <div className="Formfield">
              <label className="FormField__Label" htmlFor="Password">Password</label>
              <input type="password" id="password" className="FormField__Input" placeholder="Enter a password" name="password"/>
              </div>
              <br></br>
              <br></br>

              {/* submit button */}
              <div className = "FormField">
                <button className="FormField__Button mr-20">Sign Up</button> <a href="#"
                className="FormField__Link">I'm already a member</a>
              </div>

            </form>
          </div>
          </Route>

          <Route path="/sign-in">
            <h1>Sign In</h1>
          </Route>
        </div>

      </div>
      </Router>
    );
  }
}

export default App;
