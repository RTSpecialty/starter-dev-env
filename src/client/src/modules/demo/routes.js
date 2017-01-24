import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Courses, Demo, ManageCourse } from '../demo';

export default (
  <Route path="/demo" component={App}>
    <IndexRoute component={Demo} />
    <Route path="courses" component={Courses} />
    <Route path="course(/:id)" component={ManageCourse} />
  </Route>
);
