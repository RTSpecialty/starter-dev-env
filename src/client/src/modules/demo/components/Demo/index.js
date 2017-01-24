import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Header } from '../../../common';
import style from './style.scss';

class Demo extends Component {
  constructor(props, context) {
    super(props, context);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    this.props.router.push('/demo/courses');
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Demos" />
        <Button
          label="Courses Demo"
          onClick={this.onAddClick}
          flat primary />
      </div>
    );
  }
}

Demo.propTypes = {
  router: PropTypes.object.isRequired,
};

export default Demo;
