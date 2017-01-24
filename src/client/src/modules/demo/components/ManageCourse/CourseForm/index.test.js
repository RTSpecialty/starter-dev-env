import React from 'react';
import { mount } from 'enzyme';
import CourseForm from '../CourseForm';

const defaultProps = {
  course: {},
  allAuthors: [],
  saving: false,
  errors: {},
  onSave: f => f,
  onChange: f => f,
};

function setup(config) {
  const props = { ...defaultProps, ...config };
  return mount(<CourseForm {...props} />);
}

describe('<CourseForm />', () => {
  it('renders 4 inputs and a button', () => {
    const wrapper = setup({ saving: false });
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup({ saving: false });
    expect(wrapper.find('button').text()).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup({ saving: true });
    expect(wrapper.find('button').text()).toBe('Saving...');
  });
});
