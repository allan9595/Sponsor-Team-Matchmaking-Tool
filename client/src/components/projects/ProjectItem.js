import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';
import { Link } from 'react-router-dom';

class ProjectItem extends Component {
    onDeleteClick(id) {
        this.props.deleteProject(id);
      }

    
    render() {
        const { project } = this.props;

        return (
            <div className="col-md-12">
                <div className="card text-dark bg-info">
                    <div className="card-body">
                        <h3 className="card-title">{project.projectName}</h3>
                        <p className="card-subtitle">{project.status}</p>
                        <p className="card-text">{project.description}</p>
                        
                        
                        <Link 
                            className="btn btn-dark btn-block"
                            to={`/edit-project/${project._id}`}
                        >
                        Edit
                        </Link>
                        <button 
                            type="button" 
                            className="btn btn-danger btn-block"
                            onClick={this.onDeleteClick.bind(this, project._id)}
                        >
                            <i className="far fa-trash-alt" />
                        </button>
                        
                    </div>
                </div>
            </div>
        );
    }
}


ProjectItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteProject})(
    ProjectItem
);
