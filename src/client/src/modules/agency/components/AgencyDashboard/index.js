import React, { Component, PropTypes } from 'react';
import { Header } from '../../../common';
import style from './style.scss';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    this.props.router.push('/agency/welcome');
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Dashboard" />
      </div>
    );
  }
}

Dashboard.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Dashboard;
