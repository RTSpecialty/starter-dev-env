import React from 'react';
import { Route } from 'react-router';
import { routes as Root } from './modules/common';
import { routes as User } from './modules/user';
import { routes as Demo } from './modules/demo';
import { routes as Agency } from './modules/agency';

export default (
  <Route>
    {Root}
    {User}
    {Demo}
    {Agency}
  </Route>
);
