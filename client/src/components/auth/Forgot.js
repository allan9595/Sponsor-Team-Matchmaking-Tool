import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitEmail } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
class Forgot extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      errors: {},
      message: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email
    };

    this.props.submitEmail(userData);
    this.setState({
      message: `A email has send to ${this.state.email} with further instructions.`,
      email: ''
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, message } = this.state;
   

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
                <p className="lead text-center">
                    Use your account email to reset your password
                </p>
              <p className="text-success">{message}</p>
  
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type = "email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>  
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { submitEmail })(Forgot);