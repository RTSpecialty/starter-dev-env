import React from 'react';
import { shallow } from 'enzyme';
import { AgencyApp } from '../../components';

const props = {
  children: {},
  router: {
    replace: () => {},
  },
  user: {},
};

function setupApp() {
  return shallow(<AgencyApp {...props} />);
}

// Smoke tests
it('User App renders without crashing', () => {
  const wrapper = setupApp();
  expect(wrapper).toBeDefined();
});
