import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamItem from './TeamItem';
import { connect } from 'react-redux';

class TeamFeed extends Component {
  render() {
    const { teams } = this.props;

    return teams.map(team => <TeamItem key={team._id} team={team} />);
  }
}


TeamFeed.propTypes = {
  teams: PropTypes.array.isRequired
};

export default TeamFeed;
