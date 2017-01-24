import React, { PropTypes } from 'react';
import { AppBar } from '../../../common';
import Navigation from './Navigation';
import style from './style.scss';

const navigation = <Navigation activeClassName={style.active} className={style.appbarnav} />;

const App = ({ children }) => (
  <div className={style.root}>
    <AppBar className={style.appbar} navigation={navigation} />
    <article className={style.content}>
      {children}
    </article>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
