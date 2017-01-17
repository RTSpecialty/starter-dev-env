/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export function beginAPICall() {
  return { type: types.API_CALL_BEGIN };
}

export function errorAPICall() {
  return { type: types.API_CALL_ERROR };
}

export function beginAPICallNext(dispatch, next, params) {
  dispatch(beginAPICall());
  return next(params);
}
