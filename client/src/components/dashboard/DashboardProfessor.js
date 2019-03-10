import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectsProfessor  } from '../../actions/projectActions';
import ProjectFeedProfessor from '../projects/ProjectFeedProfessor';



  class DashboardProfessor extends Component {
    componentDidMount() {
      this.props.getProjectsProfessor();
    }

  render() {
    const {user} = this.props.auth;
    const { projects } = this.props.project;
    let dashboardContent , projectContent;

    if( projects == null ) {
      projectContent = <p>No Projects to Show</p>
    } else {
      projectContent = <ProjectFeedProfessor projects = {projects}/>
    }


    dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p className="lead text-muted">Role {user.role}</p>
          <div className="container">
            <div className="card-columns">
              {projectContent}
            </div>
          </div>
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

DashboardProfessor.propTypes = {
    auth: PropTypes.object.isRequired,  
};

const mapStateToProps = state => ({
    auth:state.auth,
    project: state.project
  });

export default connect(mapStateToProps, {
  getProjectsProfessor
})(DashboardProfessor);