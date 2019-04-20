import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountItem from './accountItem';

class AccountFeed extends Component {
  render() {
    const { users } = this.props;

    return users.map(user => <AccountItem key={user._id} user={user} />);
  }
}

AccountFeed.propTypes = {
  users: PropTypes.array.isRequired
};

export default AccountFeed;
