import * as types from '../constants';
import { activeAPICalls as initialState } from './state';

const isSuccess = type => type.substring(type.length - 8) === '_SUCCESS';

export default function activeAPICallsReducer(state = initialState, action) {
  if (action.type === types.API_CALL_BEGIN) {
    return state + 1;
  } else if (isSuccess(action.type)) {
    return state - 1;
  } else if (action.type === types.API_CALL_ERROR) {
    return state - 1;
  }

  return state;
}
