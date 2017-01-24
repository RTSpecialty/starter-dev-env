import React, { PropTypes } from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import gravatar from 'gravatar';
import style from './style.scss';

const UserAvatar = ({ user }) => (
  <Chip>
    <Avatar>
      <img alt="avatar" src={gravatar.url(user.email, { s: '100', r: 'x', d: 'retro' }, true)} />
    </Avatar>
    <span className={style.name}>{user.name}</span>
  </Chip>
);

UserAvatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserAvatar;
