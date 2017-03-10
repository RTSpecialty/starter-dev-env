/* eslint-disable import/prefer-default-export */
import * as types from '../constants';
import api from '../api/user';
import { beginAPICall, errorAPICall } from '../../common';

export const loginUserSuccess = user => ({ type: types.LOGIN_USER_SUCCESS, user });
export const registerUserSuccess = user => ({ type: types.REGISTER_USER_SUCCESS, user });

export const loadUser = () =>
  dispatch => new Promise((resolve) => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      const user = JSON.parse(localUser);
      dispatch({ type: types.LOCAL_USER, user });
      resolve('No local user found.');
    }
    resolve('Local user found.');
  });

export const loginUser = (username, password) =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(beginAPICall());
    api.loginUser(username, password)
      .then((user) => {
        dispatch(loginUserSuccess(user));
        localStorage.setItem('user', JSON.stringify(user));
        resolve('Login Successful');
      })
      .catch((error) => {
        dispatch(errorAPICall());
        reject(error);
      });
  });

export const logoutUser = () =>
  dispatch => new Promise((resolve) => {
    dispatch({ type: types.LOGOUT_USER });
    localStorage.removeItem('user');
    resolve('You have logged out.');
  });

export const registerUser = saved =>
  dispatch => new Promise((resolve, reject) => {
    dispatch(beginAPICall());
    api.registerUser(saved)
      .then((user) => {
        dispatch(registerUserSuccess(user));
        resolve('Registation Successful');
      })
      .catch((error) => {
        dispatch(errorAPICall());
        reject(error);
      });
  });
