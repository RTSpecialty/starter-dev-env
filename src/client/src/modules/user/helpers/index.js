/* eslint-disable import/prefer-default-export */

import emailValidator from 'email-validator';

export function validate(name, value) {
  let error = '';
  switch (name) {
    case 'firstName': {
      error = (value.length !== 0) ? '' : 'Please enter your first name';
      break;
    }
    case 'lastName': {
      error = (value.length !== 0) ? '' : 'Please enter your last name';
      break;
    }
    case 'password': {
      error = (value.length !== 0) ? '' : 'Please enter a password';
      break;
    }
    case 'email': {
      const valid = emailValidator.validate(value);
      error = (valid && value.length !== 0) ? '' : 'Please enter a valid email address';
      break;
    }
    default:
  }
  return error;
}
