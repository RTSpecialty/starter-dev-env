import React, { PropTypes } from 'react';
import AppBar from '../AppBar';
import style from './style.scss';

const App = ({ children }) => (
  <div className={style.root}>
    <AppBar className={style.appbar} />
    <article className={style.content}>
      {children}
    </article>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
