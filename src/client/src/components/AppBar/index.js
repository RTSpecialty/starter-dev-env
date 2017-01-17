import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Navigation from './Navigation';
import Logo from './Logo';
import style from './style.scss';

const MainAppBar = (props) => {
  let className = style.appbar;
  if (props.className) className += `${props.className}`;

  return (
    <AppBar className={className} flast fixed>
      <Logo
        height="100"
        width="150"
        logoColor="#ffffff" />
      <Navigation activeClassName={style.active} className={style.navigation} />
    </AppBar>
  );
};

MainAppBar.propTypes = {
  className: PropTypes.string,
};

MainAppBar.defaultProps = {
  className: '',
};

export default MainAppBar;
