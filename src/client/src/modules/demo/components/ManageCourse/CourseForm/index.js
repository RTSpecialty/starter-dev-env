import React, { PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button } from 'react-toolbox/lib/button';
import style from './style.scss';

const CourseForm = ({ course, allAuthors, onSave, onChange, saving, errors }) => (
  <section className={style.form}>
    <Input
      type="text"
      name="title"
      label="Title"
      onChange={onChange}
      value={course.title}
      error={errors.title} />
    <Dropdown
      auto
      name="authorId"
      label="Author"
      source={allAuthors}
      onChange={onChange}
      value={course.authorId}
      error={errors.authorId} />
    <Input
      type="text"
      name="category"
      label="Category"
      onChange={onChange}
      value={course.category}
      error={errors.category} />
    <Input
      type="text"
      name="length"
      label="Length"
      onChange={onChange}
      value={course.length}
      error={errors.length} />
    <Button
      className="save"
      disabled={saving}
      label={saving ? 'Saving...' : 'Save'}
      onClick={onSave}
      raised primary />
  </section>
);

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allAuthors: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

CourseForm.defaultProps = {
  errors: {},
};

export default CourseForm;
