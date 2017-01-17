import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authors from './authors';
import courses from './courses';
import activeAPICalls from './activeAPICalls';

const rootReducer = combineReducers({
  authors,
  courses,
  activeAPICalls,
  toastr,
});

export default rootReducer;
