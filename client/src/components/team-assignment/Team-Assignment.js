import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

import { teamAssignment} from '../../actions/projectActions';

class TeamAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        team: '',
        projectName: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      team: this.state.team,
      projectName: this.state.projectName
    }
    this.props.teamAssignment(data, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <div className="pageForm">
            <div className="jumbotron">
              <h1 className="display-4 text-center">Team Assignment</h1>
              <p className="lead text-center">
                Assignment Teams to Projects
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form 
                onSubmit={this.onSubmit} 
                encType="multipart/form-data"
                method="POST"
              >
                
                <TextFieldGroup
                  placeholder="* Team Name"
                  name="team"
                  value={this.state.team}
                  onChange={this.onChange}
                  //error={errors.email}
                  info="A team from your capstone students"
                />
                <TextFieldGroup
                  placeholder="* project name"
                  name="projectName"
                  value={this.state.projectName}
                  onChange={this.onChange}
                  //error={errors.projectName}
                  info="A project you want to assignment to this team"
                />
                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TeamAssignment.propTypes = {
  
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { teamAssignment })(
  withRouter(TeamAssignment)
);
