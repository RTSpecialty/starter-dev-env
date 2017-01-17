import * as types from '../constants';
import initialState from '../store/initialState';

export default function courseReducer(state = initialState.courses, action) {
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
