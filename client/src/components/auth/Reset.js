import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
class Reset extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
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

    const userData = {
      
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.resetPassword(userData, this.props.history, this.props.match.params.token);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form noValidate onSubmit={this.onSubmit}>
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
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword  })(withRouter(Reset));
