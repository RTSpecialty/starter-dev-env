import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { activeAPICalls } from './modules/common/reducers';
import { user } from './modules/user/reducers';
import { agency } from './modules/agency/reducers';
import { authors, courses } from './modules/demo/reducers';

const rootReducer = combineReducers({
  activeAPICalls,
  authors,
  courses,
  toastr,
  agency,
  user,
});

export default rootReducer;
