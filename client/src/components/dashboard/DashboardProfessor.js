import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectsProfessor  } from '../../actions/projectActions';
import ProjectFeedProfessor from '../projects/ProjectFeedProfessor';
import ProjectFiliter from '../projects/ProjectFiliter';
import "../dashboardCSS/dashboard.css";

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
          <p className="lead text-muted">Welcome {user.name}. <br></br> Role: {user.role}</p>
          <div className="container">
            <div className="card-columns">
              {projectContent}
            </div>
          </div>
        </div>
      )

    return (
        
        <div className="dashboard">
            <ProjectFiliter />
            <div className = "container">
            <div className="row">
                <div className="col-md-12">
                <div className="dashboardH1">
                    <h1 className="display-4">Dashboard</h1>
                </div>
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

const mapStateToProps = state => {
    return{
      auth:state.auth,
      project: state.project
      //project: selectProjects(state.project.projects, state.filters)
    }  
  };

export default connect(mapStateToProps, {
  getProjectsProfessor
})(DashboardProfessor);