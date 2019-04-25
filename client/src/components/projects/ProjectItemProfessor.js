import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "../dashboardCSS/dashboard.css";
class ProjectItemProfessor extends Component {
   
    
    render() {
        const { project } = this.props;

        return (
            <div className="col-md-12">
                <div className="card text-white bg-dark">
                    <h3 className="card-header bg-secondary"><p className="text-info">Project Name:<br></br></p>{project.projectName}</h3><p></p>
                    
                    <div className="card-body ">
                        
                        <p className="card-subtitle"><span className="text-info">Project Status:</span><br></br>{project.status}</p>
                        <p className="card-subtitle"><span className="text-info">Sponsor Email:</span><br></br>{project.email}</p>
                        
                        <p className="card-text"><span className="text-info">Proejct Description:</span><br></br>{project.description}</p> 
                        
                        <Link 
                            className="btn btn-info btn-block"
                            to={`/professor/${project._id}`}
                        >
                        View
                        </Link>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}


ProjectItemProfessor.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
    ProjectItemProfessor
);
