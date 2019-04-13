import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import '../componentCSS/forms.css';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    if (nextProps.auth.isAuthenticated && (nextProps.auth.user.role.toString() === "sponsor")) {
      this.props.history.push('/sponsor');
    }
    

    if (nextProps.auth.isAuthenticated && (nextProps.auth.user.role.toString() === "professor")) {
      this.props.history.push('/professor');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
   

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <div class="pageForm">
            <div class="jumbotron">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to MatchMe Account
              </p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type = "email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />


                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type = "password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <Link className="text-center"to="/forgot">
                Forgot your password? Click here to retrieve it! 
              </Link>
              </div>
              </div>    
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
