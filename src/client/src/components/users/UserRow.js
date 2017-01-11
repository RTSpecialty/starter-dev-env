import React, { Component, PropTypes } from 'react';

class UserRow extends Component {
  render() {
    const { index, user, removeUser } = this.props;
    return (
      <tr>
        <td><a href="#" onClick={() => removeUser(index)}>Delete</a></td>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  index: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  removeUser: PropTypes.func.isRequired,
}

export default UserRow;
