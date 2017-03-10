import React, { PropTypes } from 'react';
import { UserMenuContainer } from '../../containers';


const UserAppBarNav = ({ className, router, children }) => (
  <nav className={className}>
    <ul>
      {children}
      <li>
        <UserMenuContainer router={router} />
      </li>
    </ul>
  </nav>
);

UserAppBarNav.propTypes = {
  className: PropTypes.string,
  router: PropTypes.object.isRequired,
  children: PropTypes.array,
};

UserAppBarNav.defaultProps = {
  className: '',
  children: [],
};

export default UserAppBarNav;
