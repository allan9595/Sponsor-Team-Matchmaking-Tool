import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../components/dashboardCSS/dashboard.css";

class AccountItem extends Component {
    
    render() {
        const { user } = this.props;

        return (
            <div className="col-md-12">
                <div className="card text-dark color">
                    <div className="card-body">
                        <h3 className="card-title color"> Account Name: {user.name}</h3>
                        <p className="card-subtitle color">Account Email: {user.email}</p>
                        <p className="card-subtitle color">Account Role: {user.role}</p>
                        <p className="card-text color">Created At: {new Date(user.data).toLocaleDateString()}</p>
                        <Link 
                            className="btn btn-info btn-block"
                            to={`/admin/${user._id}`}
                        >
                        View
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


AccountItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
    AccountItem
);
