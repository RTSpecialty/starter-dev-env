import React from 'react';
import { shallow } from 'enzyme';
import { UserAppBarNav } from '../../components';

const props = {
  router: {},
  className: '',
};

function setupApp() {
  return shallow(<UserAppBarNav {...props} />);
}

// Smoke tests
it('UserAppBarNav renders without crashing', () => {
  const wrapper = setupApp();
  expect(wrapper).toBeDefined();
});
