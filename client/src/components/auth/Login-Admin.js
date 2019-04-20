import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAdmin } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import '../componentCSS/forms.css';
class LoginAdmin extends Component {
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
        
    if (this.props.auth.isAuthenticated && (this.props.auth.user.role.toString() === "admin")) {
      this.props.history.push('/admin');
    } 
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated && (nextProps.auth.user.role.toString() === "admin")) {
      this.props.history.push('/admin');
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

    this.props.loginAdmin(userData);
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
            <div className="pageForm">
            <div className="jumbotron">
              <h1 className="display-4 text-center">Admin Login</h1>
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
              </div>
              </div>    
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}

LoginAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginAdmin })(LoginAdmin);
