import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class ProjectItem extends Component {
  

  render() {
    const { project } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <br />
            <p className="text-center">{project.projectName}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{project.email}</p>
            
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

export default connect(mapStateToProps)(
    ProjectItem
);
