import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

const props = {
  children: {},
  toastr: {},
};

function setup() {
  return shallow(<App {...props} />);
}

it('renders without crashing', () => {
  const wrapper = setup();
  expect(wrapper).toBeDefined();
});
