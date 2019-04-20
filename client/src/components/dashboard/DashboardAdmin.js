import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers  } from '../../actions/authActions';
import AccountFeed from '../../accounts/accountsFeed';
import "../dashboardCSS/dashboard.css";


class DashboardAdmin extends Component {

  
  componentDidMount() {
    this.props.getUsers();
  }

  

  render() {
    const {user, users} = this.props.auth;
    let dashboardContent , accounts;

    if( users == null ) {
      accounts = <p>No accounts to Show</p>
    } else {
      accounts = <AccountFeed users = {users}/>
    }

    dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}. <br></br> Role: {user.role}</p>
          <div className="container">
            <div className="card-columns">
              {accounts}
            </div>
          </div>
        </div>
      )

    
    return (
        <div className="dashboard">
            <div className = "container">
              <div className="row">
                  <div className="col-md-12">
                    <div className="dashboardH1">
                        <h1 className="display-4 ">Dashboard</h1>
                    </div>
                        {dashboardContent}
                    </div>
              </div>
            </div>
        </div>
    )
  }
}

DashboardAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    
  };

const mapStateToProps = state => ({
    auth:state.auth
  });

export default connect(mapStateToProps, { getUsers})(DashboardAdmin);