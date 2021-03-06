import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeams  } from '../../actions/projectActions';
import TeamFeed from './TeamFeed';
import { Link } from 'react-router-dom';
import "../dashboardCSS/dashboard.css";
import "../team-assignmentCSS/assignmentList.css";

  class TeamView extends Component {
    componentDidMount() {
      this.props.getTeams();
    }

  render() {
    
    const { teams } = this.props.project;
    let dashboardContent, projectContent;

    if( teams == null ) {
      projectContent = <p>No team to Show</p>
    } else {
      projectContent = <TeamFeed teams = {teams}/>
    }


    dashboardContent = (
        <div>
          <div className="container2">
            
              {projectContent}
            
          </div>
        </div>
      )

    return (
        
        <div className="container2">
            <div className="row">
                <div className="col-md-12">
                    <div className= "card2">
                    <div className="card-header">
                            <h4>Team Assignment List</h4>
                        </div>
                        <div className="gaadiex-list">
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