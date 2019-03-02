import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {

  constructor() {

    super();

    this.state ={

        email: '',
        password: '',
        name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

//handleChange method take in event and map to values
handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name; //name attribute on the inputs
    
    //whenever the change in the name is detected -> reset the state
    this.setState({
        [name]: value
    });
}

//handleSubmit method to actually push values
handleSubmit(e) {
    e.preventDefault(); //prohibit default values by browser type

    console.log('Fomr submitted.');
    console.log(this.state);
}

      render() {
            return (
              <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>

              {/* Name */}
              <div className="Formfield">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange}/>
              </div>
              <br></br>

              {/* email */}
              <div className="Formfield">
                <label className="FormField__Label" htmlFor="email">E-Mail</label>
                <input type="text" id="email" className="FormField__Input" placeholder="Enter your e-mail address" name="email" value={this.state.email} onChange={this.handleChange}/>
              </div>
              <br></br>

              {/* password */}
              <div className="Formfield">
                <label className="FormField__Label" htmlFor="Password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter a password" name="password" value={this.state.password} onChange={this.handleChange}/>
              </div>
              <br></br>
              <br></br>

              {/* submit button */}
              <div className = "FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in"
                  className="FormField__Link">I'm already a member</Link>
                </div>

              </form>
              </div>
              
              );
            }

}

export default SignUpForm;