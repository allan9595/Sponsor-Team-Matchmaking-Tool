import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import '../layoutCSS/navbar.css';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const sponsorauthLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/sponsor/account">
              Account
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/upload">
              Project Upload
          </Link>
        </li>
        <li className="nav-item">
          <Link
            
            to = "/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          > 
            Logout
          </Link>
        </li>
      </ul>
    );

    const professorauthLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/professor/account">
              Account
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/professor/projects">
              Projects
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/professor/teams">
              Teams
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to = "/login"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          > 
            Logout
          </Link>
        </li>
      </ul>
    );
    return (
      <div className="navBar">
      <nav className="navbar navbar-expand-sm navbar-dark bg-#183563 mb-4">
        <div className="container">
          {
            (isAuthenticated && user.role === 'sponsor') ? 
            
            <Link className="navbar-brand" to="/sponsor">
            MatchMe
            </Link>
            :(isAuthenticated && user.role === 'professor') ? 

            <Link className="navbar-brand" to="/professor">
            MatchMe
            </Link>
            :

            <Link className="navbar-brand" to="/">
            MatchMe
            </Link>
          }
          
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
    
              </li>
            </ul>
            {
              (isAuthenticated && user.role === 'sponsor') ? sponsorauthLink 
              :(isAuthenticated && user.role === 'professor') ? professorauthLink 
              :guestLinks
            }
          </div>
        </div>
      </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
