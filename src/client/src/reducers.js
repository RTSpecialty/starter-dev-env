import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { activeAPICalls } from './modules/common/reducers';
import { authors, courses } from './modules/demo/reducers';

const rootReducer = combineReducers({
  activeAPICalls,
  authors,
  courses,
  toastr,
});

export default rootReducer;
