import React from 'react';
import PropTypes from 'prop-types';
import selectProjects from '../../selectors/projectSelector';
import ProjectItemProfessor from './ProjectItemProfessor';
import { connect } from 'react-redux';

export const  ProjectFeedProfessor = (props) =>  (
  
    
    
      props.projects.length === 0 ? (
        <span>No Projects to Show</span>
      ) : (
        props.projects.map((project) => {
          return <ProjectItemProfessor key={project._id} project={project}/>
        })
      ) 
    
    
)


ProjectFeedProfessor.propTypes = {
  projects: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    projects: selectProjects(state.project.projects, state.filters)
  }
}



export default connect(mapStateToProps)(ProjectFeedProfessor);
