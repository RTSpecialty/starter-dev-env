import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  AgencyApp,
  AgencyAgents,
  AgencyCoverage,
  AgencyDashboard,
  AgencyForms,
  AgencyLicenses,
  AgencyLocations,
  AgencyNIPR,
  AgencyUsers,
  AgencyWelcome,
  AgencyWrapper } from '../agency';

const welcome = AgencyWrapper('welcome', AgencyWelcome);

export default (
  <Route path="/agency" component={AgencyApp}>
    <IndexRoute component={welcome} />
    <Route path="agents" component={AgencyWrapper('agents', AgencyAgents)} />
    <Route path="coverage" component={AgencyWrapper('coverage', AgencyCoverage)} />
    <Route path="dashboard" component={AgencyDashboard} />
    <Route path="forms" component={AgencyWrapper('forms', AgencyForms)} />
    <Route path="licenses" component={AgencyWrapper('licenses', AgencyLicenses)} />
    <Route path="locations" component={AgencyWrapper('locations', AgencyLocations)} />
    <Route path="nipr" component={AgencyWrapper('nipr', AgencyNIPR)} />
    <Route path="users" component={AgencyWrapper('users', AgencyUsers)} />
    <Route path="welcome" component={welcome} />
  </Route>
);
