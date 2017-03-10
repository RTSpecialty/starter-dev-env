import * as types from '../constants';
import { user as initialState } from './state';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS: {
      return action.user;
    }
    case types.REGISTER_USER_SUCCESS: {
      return action.user;
    }
    case types.LOCAL_USER: {
      return action.user;
    }
    case types.LOGOUT_USER: {
      return {};
    }
    default:
      return state;
  }
}
