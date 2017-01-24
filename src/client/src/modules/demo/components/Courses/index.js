import React, { Component, PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import CourseList from './CourseList';
import { Header } from '../../../common';
import style from './style.scss';

class Courses extends Component {
  constructor(props, context) {
    super(props, context);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    this.props.router.push('/demo/course');
  }

  render() {
    const { courses } = this.props;
    return (
      <div className={style.component}>
        <Header title="Courses" />
        <Button
          label="Add Course"
          onClick={this.onAddClick}
          flat primary />
        <CourseList courses={courses} />
      </div>
    );
  }
}

Courses.propTypes = {
  router: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
};

export default Courses;
