import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectItemProfessor extends Component {
   
    
    render() {
        const { project } = this.props;

        return (
            <div className="col-md-12">
                <div className="card text-dark bg-info">
                    <div className="card-body">
                        <h3 className="card-title">{project.projectName}</h3>
                        <p className="card-subtitle">{project.status}</p>
                        <p className="card-text">{project.description}</p> 
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
