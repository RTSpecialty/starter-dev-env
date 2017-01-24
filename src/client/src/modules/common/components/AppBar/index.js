import React, { PropTypes } from 'react';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Navigation from './Navigation';
import Logo from '../Logo';
import style from './style.scss';

const MainAppBar = (props) => {
  let className = style.appbar;
  if (props.className) className += `${props.className}`;

  return (
    <AppBar className={className} flast fixed>
      {props.logo}
      {props.navigation}
    </AppBar>
  );
};

MainAppBar.propTypes = {
  logo: PropTypes.object,
  className: PropTypes.string,
  navigation: PropTypes.object,
};

MainAppBar.defaultProps = {
  logo: <Logo height="100" width="150" logoColor="#ffffff" />,
  className: '',
  navigation: <Navigation activeClassName={style.active} className={style.navigation} />,
};

export default MainAppBar;
