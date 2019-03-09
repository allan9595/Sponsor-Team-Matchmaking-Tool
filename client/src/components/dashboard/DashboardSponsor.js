import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects  } from '../../actions/projectActions';
import Projects from '../projects/Projects';
class DashboardSponsor extends Component {

  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const {user} = this.props.auth;
    let dashboardContent;
    dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          

        </div>
      )

    return (
        <div className="dashboard">
            <div className = "container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    {dashboardContent}
                </div>
            </div>
            </div>
        </div>
    )
  }
}

DashboardSponsor.propTypes = {
    auth: PropTypes.object.isRequired,
    
  };

const mapStateToProps = state => ({
    auth:state.auth,
    project: state.project
  });

export default connect(mapStateToProps, { getProjects})(DashboardSponsor);
