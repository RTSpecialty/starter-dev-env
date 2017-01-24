/* eslint-disable import/prefer-default-export */
import * as types from '../constants';
import api from '../api/author';
import { beginAPICallNext, errorAPICall } from '../../common';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return dispatch => beginAPICallNext(dispatch, api.getAllAuthors)
    .then(authors => dispatch(loadAuthorsSuccess(authors)))
    .catch((error) => {
      dispatch(errorAPICall());
      throw error;
    });
}
