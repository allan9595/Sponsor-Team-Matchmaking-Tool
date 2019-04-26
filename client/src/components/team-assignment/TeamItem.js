import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import "../dashboardCSS/dashboard.css";
class TeamItem extends Component {
   
    
    render() {
        const { team } = this.props;

        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="gaadiex-list">
                        <div className="gaadiex-list-item">
                            <h3 className="text-info">Team Name: {team.team}</h3>
                            <h4>Project Name: {team.projectName}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


TeamItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
    TeamItem 
);