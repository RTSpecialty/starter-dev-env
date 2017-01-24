/* eslint-disable import/prefer-default-export */
import * as types from '../constants';
import api from '../api/course';
import { beginAPICallNext, errorAPICall } from '../../common';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return dispatch => beginAPICallNext(dispatch, api.getAllCourses)
    .then(courses => dispatch(loadCoursesSuccess(courses)))
    .catch((error) => {
      dispatch(errorAPICall());
      throw error;
    });
}

export function saveCourse(course) {
  return dispatch => beginAPICallNext(dispatch, api.saveCourse, course)
    .then(saved => dispatch(course.id
      ? updateCourseSuccess(saved)
      : createCourseSuccess(saved)))
    .catch((error) => {
      dispatch(errorAPICall());
      throw error;
    });
}
