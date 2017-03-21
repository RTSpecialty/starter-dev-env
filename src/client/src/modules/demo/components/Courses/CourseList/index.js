import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Table from 'react-toolbox/lib/table';

const CourseModel = {
  watchHref: { type: Object, title: 'Watch' },
  title: { type: Object },
  authorId: { type: String, title: 'Author' },
  category: { type: String },
  length: { type: String },
};

function getSource(courses) {
  return courses.map((course) => {
    const source = Object.assign({}, course);
    source.watchHref = (
      <a href={course.watchHref} rel="noopener noreferrer" target="_blank">Watch</a>
    );
    source.title = <Link to={`/demo/course/${course.id}`}>{course.title}</Link>;
    return source;
  });
}

const CourseList = ({ courses }) => {
  const source = getSource(courses);
  return (
    <Table
      model={CourseModel}
      source={source}
      selectable={false} />
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;
