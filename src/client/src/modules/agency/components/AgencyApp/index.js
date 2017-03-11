import React, { PropTypes } from 'react';
import { AppBar } from '../../../common';
import { UserApp } from '../../../user';
import MainNav from './MainNav';
import style from './style.scss';

class AgencyApp extends UserApp {
  constructor(props, context) {
    super(props, context);
    this.navs = [];
  }

  render() {
    const { children } = this.props;
    return (
      <div className={style.root}>
        <AppBar className={style.appbar} navigation={this.navigation()} />
        <MainNav className={style.navigation} />
        <article className={style.content}>
          {children}
        </article>
      </div>
    );
  }
}

AgencyApp.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default AgencyApp;
