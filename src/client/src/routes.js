import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import { Home, About } from './components/Pages';
import Courses from './containers/Courses';
import ManageCourse from './containers/ManageCourse';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="courses" component={Courses} />
    <Route path="course(/:id)" component={ManageCourse} />
    <Route path="about" component={About} />
  </Route>
);
