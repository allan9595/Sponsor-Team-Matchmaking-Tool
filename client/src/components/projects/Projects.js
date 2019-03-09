import React, { Component } from 'react';
import ProjectFeed from './ProjectFeed';
import { getProjects  } from '../../actions/projectActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Projects extends Component {
    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const { projects } = this.props.project;
        let projectContent;
        return (
        <div>
            
        </div>
        )
    }
}


Projects.propTypes = {
    getProjects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    project: state.project
  });
  
  export default connect(mapStateToProps, { getProjects })(Projects);
  