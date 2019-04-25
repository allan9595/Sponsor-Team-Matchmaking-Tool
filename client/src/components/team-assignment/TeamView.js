import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams  } from '../../actions/projectActions';
import TeamFeed from './TeamFeed';
import { Link } from 'react-router-dom';
import "../dashboardCSS/dashboard.css";

  class TeamView extends Component {
    componentDidMount() {
      this.props.getTeams();
    }

  render() {
    const {user} = this.props.auth;
    const { teams } = this.props.project;
    let dashboardContent, projectContent;

    if( teams == null ) {
      projectContent = <p>No team to Show</p>
    } else {
      projectContent = <TeamFeed teams = {teams}/>
    }


    dashboardContent = (
        <div>
          <div className="container">
            
              {projectContent}
            
          </div>
        </div>
      )

    return (
        
        <div class="container">
	
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                    <div class="card-header">
                            <h4>Team Assignment List</h4>
                        </div>
                        <div class="gaadiex-list">
                          {dashboardContent}
                        </div>
                        <Link 
                          className="btn btn-info btn-block"
                          to={`/teams`}
                        >
                         Add
                      </Link>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

TeamView.propTypes = {
    auth: PropTypes.object.isRequired,  
};

const mapStateToProps = state => {
    return{
      auth:state.auth,
      project: state.project
    }  
  };

export default connect(mapStateToProps, {
  getTeams
})(TeamView);