import React, { Component, PropTypes } from 'react';
import { Menu } from 'react-toolbox/lib/menu';
import { UserAvatarContainer } from '../../containers';

class UserAvatarMenu extends Component {
  state = { active: false };
  handleButtonClick = () => this.setState({ active: !this.state.active });
  handleMenuHide = () => this.setState({ active: false });
  render() {
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <UserAvatarContainer onClick={this.handleButtonClick} />
        <Menu position="auto" active={this.state.active} onHide={this.handleMenuHide}>
          {this.props.children}
        </Menu>
      </div>
    );
  }
}

UserAvatarMenu.propTypes = {
  children: PropTypes.array.isRequired,
};

export default UserAvatarMenu;
