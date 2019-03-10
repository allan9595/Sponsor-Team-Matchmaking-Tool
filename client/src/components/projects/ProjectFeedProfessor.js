import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProjectItemProfessor from './ProjectItemProfessor';

class ProjectFeedProfessor extends Component {
  render() {
    const { projects } = this.props;

    return projects.map(project => <ProjectItemProfessor key={project._id} project={project} />);
  }
}

ProjectFeedProfessor.propTypes = {
  projects: PropTypes.array.isRequired
};

export default ProjectFeedProfessor;
