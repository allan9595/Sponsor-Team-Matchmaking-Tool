import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerAdmin } from '../../actions/authActions';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import '../componentCSS/forms.css';

class AdminSignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      role:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role
    };

    this.props.registerAdmin(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const options = [
        { label: '* Select Your Role', value: 0 },
        { label: 'admin', value: 'admin' }
    ];



    return (
      <div className="pageForm">
      <div className="jumbotron">
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up As Admin</h1>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    type = "text"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type = "email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}

                  />
                  

                  <SelectListGroup
                    placeholder="Role"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                    options={options}
                    error={errors.role}
                    info="choose your role"
                    
                  />


                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type = "password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />


                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type = "password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
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

AdminSignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(AdminSignUp));
