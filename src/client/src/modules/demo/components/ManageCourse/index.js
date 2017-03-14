import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import CourseForm from './CourseForm';
import { Header } from '../../../common';
import style from './style.scss';

class ManageCourse extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      course: { ...props.course },
      saving: false,
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      const course = { ...nextProps.course };
      this.setState({ course });
    }
  }

  updateCourseState(value, event) {
    const name = event.target.name;
    const course = { ...this.state.course };
    course[name] = value;
    return this.setState({ course });
  }

  saveCourse() {
    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({ saving: false });
        toastr.success('Success!', 'The course was saved.');
        this.props.router.push('/demo/courses');
      })
      .catch((error) => {
        this.setState({ saving: false });
        toastr.error('Oops!', error.message);
      });
  }

  render() {
    //    const { course } = this.props;
    return (
      <div className={style.component}>
        <Header title="Manage Course" />
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}
          onChange={this.updateCourseState}
          onSave={this.saveCourse} />
      </div>
    );
  }
}

ManageCourse.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

export default ManageCourse;
