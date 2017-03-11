import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  AgencyApp,
  AgencyAgents,
  AgencyDashboard,
  AgencyForms,
  AgencyLicenses,
  AgencyLocations,
  AgencyNIPR,
  AgencyUsers,
  AgencyWelcome } from '../agency';

export default (
  <Route path="/agency" component={AgencyApp}>
    <IndexRoute component={AgencyWelcome} />
    <Route path="welcome" component={AgencyWelcome} />
    <Route path="dashboard" component={AgencyDashboard} />
    <Route path="/agency/nipr" component={AgencyNIPR} />
    <Route path="/agency/locations" component={AgencyLocations} />
    <Route path="/agency/licenses" component={AgencyLicenses} />
    <Route path="/agency/forms" component={AgencyForms} />
    <Route path="/agency/agents" component={AgencyAgents} />
    <Route path="/agency/users" component={AgencyUsers} />
  </Route>
);
