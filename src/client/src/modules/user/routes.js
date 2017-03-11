import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserAppContainer, UserPassword, UserProfile } from '../user';

export default (
  <Route path="/user" component={UserAppContainer}>
    <IndexRoute component={UserProfile} />
    <Route path="profile" component={UserProfile} />
    <Route path="password(/:id)" component={UserPassword} />
  </Route>
);
