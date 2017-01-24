import React from 'react';
import { Route } from 'react-router';
import { App, Password } from '../user';

export default (
  <Route path="/user" component={App}>
    <Route path="password(/:id)" component={Password} />
  </Route>
);
