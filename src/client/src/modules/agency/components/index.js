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
    name: 'welcome',
    caption: 'Welcome',
    path: '/agency/welcome',
    next: { name: 'nipr', path: '/agency/nipr' },
    back: { name: 'home', path: '/' },
  },
  nipr: {
    name: 'nipr',
    caption: 'NAIC - NIPR',
    path: '/agency/nipr',
    next: { name: 'coverage', path: '/agency/coverage' },
    back: { name: 'welcome', path: '/agency/welcome' },
  },
  coverage: {
    name: 'coverage',
    caption: 'E&O Coverage',
    path: '/agency/coverage',
    next: { name: 'locations', path: '/agency/locations' },
    back: { name: 'nipr', path: '/agency/nipr' },
  },
  locations: {
    name: 'locations',
    caption: 'Locations',
    path: '/agency/locations',
    next: { name: 'licenses', path: '/agency/licenses' },
    back: { name: 'coverage', path: '/agency/coverage' },
  },
  licenses: {
    name: 'licenses',
    caption: 'Licenses',
    path: '/agency/licenses',
    next: { name: 'forms', path: '/agency/forms' },
    back: { name: 'locations', path: '/agency/locations' },
  },
  forms: {
    name: 'forms',
    caption: 'Forms',
    path: '/agency/forms',
    next: { name: 'agents', path: '/agency/agents' },
    back: { name: 'licenses', path: '/agency/licenses' },
  },
  agents: {
    name: 'agents',
    caption: 'Agents',
    path: '/agency/agents',
    next: { name: 'users', path: '/agency/users' },
    back: { name: 'forms', path: '/agency/forms' },
  },
  users: {
    name: 'users',
    caption: 'Users',
    path: '/agency/users',
    next: { name: 'dashboard', path: '/agency/dashboard' },
    back: { name: 'agents', path: '/agency/agents' },
  },
  // dashboard: {
  //   name: 'Dashboard',
  //   path: '/agency/dashboard',
  // },
};
