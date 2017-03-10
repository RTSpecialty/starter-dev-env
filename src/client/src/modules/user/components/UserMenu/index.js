import React, { Component, PropTypes } from 'react';
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { UserAvatarMenu } from '../../components';
import { UserAvatarContainer } from '../../containers';

class UserMenu extends Component {
  handleClick(name) {
    const { router, actions } = this.props;
    switch (name) {
      case 'profile':
        router.push('/user/profile');
        break;
      case 'password':
        router.push('/user/password/change');
        break;
      case 'logoff':
        actions.logoutUser().then(() => router.replace('/logoff'));
        break;
      default:
    }
  }

  renderMenu() {
    return (
      <UserAvatarMenu>
        <MenuItem><UserAvatarContainer /></MenuItem>
        <MenuDivider />
        <MenuItem
          value="help" icon="person" caption="Edit Profile"
          onClick={this.handleClick.bind(this, 'profile')} />
        <MenuItem
          value="settings" icon="security" caption="Change Password"
          onClick={this.handleClick.bind(this, 'password')} />
        <MenuDivider />
        <MenuItem
          value="signout" icon="remove_circle" caption="Log Off"
          onClick={this.handleClick.bind(this, 'logoff')} />
      </UserAvatarMenu>
    );
  }

  render() {
    return (Object.keys(this.props.user).length !== 0)
      ? this.renderMenu()
      : null;
  }
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default UserMenu;
