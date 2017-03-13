import * as types from '../constants';
import { agency as initialState } from './state';

export default function agencyReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AGENCY_SUCCESS: {
      return action.agency;
    }
    case types.NEW_AGENCY_SUCCESS: {
      return action.agency;
    }
    case types.SAVED_AGENCY_SUCCESS: {
      return action.agency;
    }
    case types.LOGOUT_USER: {
      return {};
    }
    default:
      return state;
  }
}
