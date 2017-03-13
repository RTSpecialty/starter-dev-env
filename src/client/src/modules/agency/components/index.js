export { default as AgencyAgents } from './AgencyAgents';
export { default as AgencyApp } from './AgencyApp';
export { default as AgencyCoverage } from './AgencyCoverage';
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
    next: '/agency/nipr',
  },
  nipr: {
    name: 'NAIC - NIPR',
    path: '/agency/nipr',
    next: '/agency/locations',
  },
  locations: {
    name: 'Locations',
    path: '/agency/locations',
    next: '/agency/coverage',
  },
  coverage: {
    name: 'E & O Coverage',
    path: '/agency/coverage',
    next: '/agency/licenses',
  },
  licenses: {
    name: 'Licenses',
    path: '/agency/licenses',
    next: '/agency/forms',
  },
  forms: {
    name: 'Forms',
    path: '/agency/forms',
    next: '/agency/agents',
  },
  agents: {
    name: 'Agents',
    path: '/agency/agents',
    next: '/agency/users',
  },
  users: {
    name: 'Users',
    path: '/agency/users',
    next: '/agency/dashboard',
  },
  // dashboard: {
  //   name: 'Dashboard',
  //   path: '/agency/dashboard',
  // },
};
