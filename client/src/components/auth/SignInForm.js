import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

import classnames from 'classnames';


class SignInForm extends Component {
    
    constructor() {
        super();
        this.state ={
            email: '',
            password: '',
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
        if (this.props.auth.isAuthenticated && (this.props.auth.user.role.toString() === "sponsor")) {
          this.props.history.push('/sponsor');
        } 
        
        if(this.props.auth.isAuthenticated && (this.props.auth.user.role.toString() === "professor")){
            this.props.history.push('/professor');
        }
      }
    
      
       
    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated && (this.props.auth.user.role.toString() === "sponsor")) {
            this.props.history.push('/sponsor');
          } 
        if(this.props.auth.isAuthenticated && (this.props.auth.user.role.toString() ==="professor")){
            this.props.history.push('/professor');
        }
        
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
        console.log(this.props.history);
    }
      
      
   

    
    //handleSubmit method to actually push values
    handleSubmit(e) {
        e.preventDefault(); //prohibit default values by browser type

        const userData = {
            email: this.state.email,
            password: this.state.password
          };
      
          this.props.loginUser(userData);
          
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


        render() {
            const { errors } = this.state;
            return (
                <div className="FormCenter">
                <form 
                    className="FormFields" 
                    onSubmit={this.handleSubmit}
                >

                    {/* email */}
                    <div className="Formfield">
                    <label className="FormField__Label" htmlFor="email">E-Mail</label>
                    <input 
                        type="text" 
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
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                    </div>
                    <br></br>
                    <br></br>

                    {/* submit button */}
                    <div className = "FormField">
                    <button className="FormField__Button mr-20">Sign In</button> 
                    <Link to="/signup" className="FormField__Link">Create an account</Link>
                    </div>

                </form>
                </div>
            );
        }

}


SignInForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    
    errors: state.errors
  });
export default connect(mapStateToProps, {loginUser})(SignInForm);