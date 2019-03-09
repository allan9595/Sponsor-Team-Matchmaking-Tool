import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

class ProjectFeed extends Component {
  render() {
    const { projects } = this.props;

    return projects.map(project => <ProjectItem key={project._id} project={project} />);
  }
}

ProjectFeed.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectFeed;
