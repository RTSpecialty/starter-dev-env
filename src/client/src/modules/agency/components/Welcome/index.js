import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Header } from '../../../common';
import style from './style.scss';

class Welcome extends Component {
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
        <Header title="Welcome New Agencies" />
        <Button
          label="Welcome Home"
          onClick={this.onAddClick}
          flat primary />
      </div>
    );
  }
}

Welcome.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Welcome;
