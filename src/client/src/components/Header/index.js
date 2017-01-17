import React, { PropTypes } from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './style.scss';

const Header = ({ title, loading }) => (
  <div className={style.header}>
    <h1>{title}</h1>
    {loading && <ProgressBar
      type="circular"
      mode="indeterminate"
      multicolor={true}
      className={style.loader} />}
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Header;
