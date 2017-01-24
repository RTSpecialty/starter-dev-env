import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, About, Home } from '../common';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
  </Route>
);
