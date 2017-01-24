import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Welcome } from '../agency';

export default (
  <Route path="/agency" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="welcome" component={Welcome} />
  </Route>
);
