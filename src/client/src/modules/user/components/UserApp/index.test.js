import React from 'react';
import { shallow } from 'enzyme';
import { UserApp } from '../../components';

const props = {
  children: {},
  router: {},
  user: {},
};

function setupApp() {
  return shallow(<UserApp {...props} />);
}

// Smoke tests
it('User App renders without crashing', () => {
  const wrapper = setupApp();
  expect(wrapper).toBeDefined();
});
