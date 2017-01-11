import React, { Component } from 'react';
import UserRow from './UserRow';
import { getUsers, deleteUser } from '../../api/users';
import './UserTable.css'

class UserTable extends Component {
  constructor() {
    super();
    this.state = {
      users: {}
    }
    this.removeUser = this.removeUser.bind(this);
  }

  componentWillMount() {
    getUsers().then(result => {
      if (result) {
        const users = {};
        result.forEach((user) => {
          users[user.id] = user;
        }, {});
        this.setState({ users });
      }
    });
  }

  removeUser(key) {
    deleteUser(key).then(() => {
      const users = { ...this.state.users };
      delete users[key];
      this.setState({ users });
    });
  }

  render() {
    return (
      <div className="users">
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody id="users">
          {Object.keys(this.state.users)
            .map(key => <UserRow key={key} index={key}
              user={this.state.users[key]}
              removeUser={this.removeUser} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
