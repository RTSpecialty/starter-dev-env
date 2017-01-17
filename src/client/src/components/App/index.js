import React, { PropTypes } from 'react';
import 'normalize.css';
import AppBar from '../AppBar';
import style from './style.scss';

/* eslint-disable react/prefer-stateless-function */

const App = ({ children, toastr }) => (
  <div className={style.root}>
    <AppBar className={style.appbar} />
    <article className={style.content}>
      {children}
    </article>
    {toastr}
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  toastr: PropTypes.object.isRequired,
};

export default App;
