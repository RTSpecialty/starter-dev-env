import * as types from '../constants';
import { completed as initialState } from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS: {
      return action.user.completed;
    }
    case types.REGISTER_USER_SUCCESS: {
      return action.user.completed;
    }
    case types.SAVED_USER_SUCCESS: {
      return action.user.completed;
    }
    case types.SAVED_PASSWORD_SUCCESS: {
      return action.user.completed;
    }
    case types.LOCAL_USER: {
      return action.user.completed;
    }
    case types.SAVED_AUTH_SUCCESS: {
      return action.user.completed;
    }
    case types.SAVED_COMPLETED_SUCCESS: {
      return action.user.completed;
    }
    case types.LOGOUT_USER: {
      return {};
    }
    default:
      return state;
  }
}
