import React from 'react';
import { Link } from 'react-router';

const Navigation = props => (
  <nav className={props.className}>
    <ul>
      <li>
        <Link activeClassName={props.activeClassName} to="/user/password">Password</Link>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  activeClassName: React.PropTypes.string,
  className: React.PropTypes.string,
};

Navigation.defaultProps = {
  activeClassName: '',
  className: '',
};

export default Navigation;
