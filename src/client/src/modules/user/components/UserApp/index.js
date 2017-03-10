import React, { Component, PropTypes } from 'react';
import { AppBar } from '../../../common';
import { UserAppBarNav } from '../../components';
import style from './style.scss';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.navs = [];
    this.navigation = this.navigation.bind(this);
    if (Object.keys(this.props.user).length === 0) {
      // user required
      this.props.router.replace('/home/login');
    }
  }

  navigation() {
    const { user, router } = this.props;
    return (
      <UserAppBarNav
        activeClassName={style.active}
        className={style.appbarnav}
        user={user}
        router={router} >
        {this.navs}
      </UserAppBarNav>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div className={style.root}>
        <AppBar className={style.appbar} navigation={this.navigation()} />
        <article className={style.content}>
          {children}
        </article>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default App;
