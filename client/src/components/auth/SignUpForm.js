import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import SelectListGroup from '../common/SelectListGroup';

class SignUpForm extends Component {

  constructor() {
    super();
    this.state ={
        name: '',
        email: '',
        password: '',
        password2: '',
        errors : {},
        role: ''
       
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

componentWillReceiveProps(nextProps){
  if(nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
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

   const newUser = {
     name: this.state.name,
     email: this.state.email,
     role: this.state.role,
     password:this.state.password,
     password2: this.state.password2
   }
   this.props.registerUser(newUser, this.props.history);
}

render() {


  const { errors } = this.state;
  const options = [
    { label: '* Select Your Role', value: 0 },
    { label: 'Sponsor', value: 'sponsor' },
    { label: 'Professor', value: 'professor' },
  ];

  


  return (
    <div className="FormCenter">

      <form noValidate
        className="FormFields" 
        onSubmit={this.handleSubmit}
      >

      {/* Name */}
      
      <div className="Formfield">
        <label className="FormField__Label" htmlFor="name">Full Name</label>
        <input 
            type="text" 
            id="name"
            className={classnames('FormField__Input form-control', {
              'is-invalid': errors.name
            })}
            placeholder="Enter your full name" 
            name="name" 
            value={this.state.name} 
            onChange={this.handleChange}  
                 
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
      </div>
      
      <br></br>

      {/* email */}
      
      <div className="Formfield">
        <label className="FormField__Label " htmlFor="email">E-Mail</label>
        <input 
          type="email" 
          id="email"
          className={classnames('FormField__Input form-control', {
            'is-invalid': errors.email
          })} 
          placeholder="Enter your e-mail address"                   
          name="email" 
          value={this.state.email} 
          onChange={this.handleChange}
          
        />
       {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
      </div>
      <br></br>

      <SelectListGroup
        placeholder="Role"
        name="role"
        value={this.state.role}
        onChange={this.handleChange}
        options={options}
        error={errors.role}
        info="choose your role"
        
      />
      
  

      {/* password */}
      <div className="Formfield">
        <label className="FormField__Label" htmlFor="Password">Password</label>
        <input 
          type="password" 
          id="password"
          className={classnames('FormField__Input form-control', {
            'is-invalid': errors.password
          })}  
          placeholder="Enter a password"          
          name="password" 
          value={this.state.password} 
          onChange={this.handleChange}
          error={errors.password}
        />
         {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
      </div>
      
      
      <br></br>

       {/* password Confirm */}
       <div className="Formfield">
        <label className="FormField__Label" htmlFor="Password">Password Confirm</label>
        <input 
          type="password" 
          id="password2"
          className={classnames('FormField__Input form-control', {
            'is-invalid': errors.password2
          })}   
          placeholder="Confirm your password" 
          name="password2" 
          value={this.state.password2} 
          onChange={this.handleChange}
          error={errors.password2}
        />
        {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
      </div>
      <br></br>
      

      {/* submit button */}
      <div className = "FormField">
          <button className="FormField__Button mr-20">Sign Up</button> 
          <Link 
            to="/login" 
            className="FormField__Link"
          >
          I'm already a member
          </Link>
        </div>

      </form>
    </div>
    
    );
  }

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUpForm));