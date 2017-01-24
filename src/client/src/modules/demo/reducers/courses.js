import * as types from '../constants';
import { courses as initialState } from './state';

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }

    case types.CREATE_COURSE_SUCCESS: {
      return [
        ...state,
        { ...action.course },
      ];
    }

    case types.UPDATE_COURSE_SUCCESS: {
      return [
        { ...action.course },
        ...state.filter(course => course.id !== action.course.id),
      ];
    }

    default:
      return state;
  }
}
