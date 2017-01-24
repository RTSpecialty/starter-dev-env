import { loadAuthors } from './actions/authors';
import { loadCourses } from './actions/courses';
import * as states from './reducers/state';

export { Demo } from './components';
export { App, Courses, ManageCourse } from './containers';
export { default as routes } from './routes';

export function loader(store) {
  store.dispatch(loadCourses());
  store.dispatch(loadAuthors());
}

export const state = {
  ...states,
};
