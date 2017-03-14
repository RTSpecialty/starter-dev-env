import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { activeAPICalls } from './modules/common/reducers';
import { auth, user, completed } from './modules/user/reducers';
import { agency } from './modules/agency/reducers';
import { authors, courses } from './modules/demo/reducers';

const rootReducer = combineReducers({
  activeAPICalls,
  authors,
  courses,
  toastr,
  agency,
  auth,
  user,
  completed,
});

export default rootReducer;
