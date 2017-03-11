export { default as AgencyAgents } from './AgencyAgents';
export { default as AgencyApp } from './AgencyApp';
export { default as AgencyDashboard } from './AgencyDashboard';
export { default as AgencyForms } from './AgencyForms';
export { default as AgencyLicenses } from './AgencyLicenses';
export { default as AgencyLocations } from './AgencyLocations';
export { default as AgencyNIPR } from './AgencyNIPR';
export { default as AgencyUsers } from './AgencyUsers';
export { default as AgencyWelcome } from './AgencyWelcome';

export const components = {
  welcome: {
    name: 'Welcome',
    path: '/agency/welcome',
  },
  nipr: {
    name: 'NAIC - NIPR',
    path: '/agency/nipr',
  },
  locatons: {
    name: 'Locations',
    path: '/agency/locations',
  },
  licenses: {
    name: 'Licenses',
    path: '/agency/licenses',
  },
  forms: {
    name: 'Forms',
    path: '/agency/forms',
  },
  agents: {
    name: 'Agents',
    path: '/agency/agents',
  },
  users: {
    name: 'Users',
    path: '/agency/users',
  },
  // dashboard: {
  //   name: 'Dashboard',
  //   path: '/agency/dashboard',
  // },
};
