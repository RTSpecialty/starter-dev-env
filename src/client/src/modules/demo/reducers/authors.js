import * as types from '../constants';
import { authors as initialState } from './state';

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
