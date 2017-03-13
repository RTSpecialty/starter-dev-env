import * as types from '../constants';
import api from '../api';
import { beginAPICall, errorAPICall } from '../../common';

export const loadAgency = id =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(beginAPICall());
    api.loadAgency(id)
      .then((agency) => {
        dispatch({ type: types.LOAD_AGENCY_SUCCESS, agency });
        resolve({ agency, msg: 'The agency was found.' });
      })
      .catch((error) => {
        dispatch(errorAPICall());
        reject(error);
      });
  });

export const newAgency = saved =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(beginAPICall());
    api.newAgency(saved)
      .then((agency) => {
        dispatch({ type: types.NEW_AGENCY_SUCCESS, agency });
        resolve({ agency, msg: 'The agency information was saved.' });
      })
      .catch((error) => {
        dispatch(errorAPICall());
        reject(error);
      });
  });

export const saveAgency = (id, saved) =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(beginAPICall());
    api.saveAgency(id, saved)
      .then((agency) => {
        dispatch({ type: types.SAVED_AGENCY_SUCCESS, agency });
        resolve({ agency, msg: 'The agency information was saved.' });
      })
      .catch((error) => {
        dispatch(errorAPICall());
        reject(error);
      });
  });
