import React from 'react';
import { Link, IndexLink } from 'react-router';

const Navigation = props => (
  <nav className={props.className}>
    <ul>
      <li>
        <IndexLink activeClassName={props.activeClassName} to="/demo">Demos</IndexLink>
      </li>
      <li>
        <Link activeClassName={props.activeClassName} to="/demo/courses">Courses</Link>
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
