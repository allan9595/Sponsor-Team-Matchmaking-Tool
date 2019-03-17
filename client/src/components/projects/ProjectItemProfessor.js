import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class ProjectItemProfessor extends Component {
   
    
    render() {
        const { project } = this.props;

        return (
            <div className="col-md-12">
                <div className="card text-white bg-dark">
                    <h3 className="card-header bg-secondary">{project.projectName}</h3>
                    <div className="card-body ">     
                        <p className="card-subtitle">{project.status}</p>
                        <p className="card-subtitle">{project.email}</p>
                        <p className="card-text">{project.description}</p> 
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
