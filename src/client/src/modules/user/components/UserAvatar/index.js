import React, { PropTypes } from 'react';
import Avatar from 'react-toolbox/lib/avatar';
import gravatar from 'gravatar';
import style from './style.scss';

/* eslint-disable jsx-a11y/no-static-element-interactions */
const UserAvatar = ({ email, name, organization, onClick }) => (
  <div className={style.user} onClick={onClick}>
    <Avatar>
      <img alt="avatar" src={gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true)} />
    </Avatar>
    <div className={style.info}>
      <div className={style.name}>{name}</div>
      <div className={style.organization}>{organization}</div>
    </div>
  </div>
);

UserAvatar.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  organization: PropTypes.string,
  onClick: PropTypes.func,
};

UserAvatar.defaultProps = {
  organization: '',
  onClick: () => {},
};

export default UserAvatar;
