/* eslint-disable import/prefer-default-export */

export function validate(name, value) {
  let error = '';
  switch (name) {
    case 'name': {
      error = (value && value.length !== 0) ? '' : 'Please enter your agency name';
      break;
    }
    case 'classification': {
      error = (value && value.length !== 0) ? '' : 'Please pick your federal tax classification';
      break;
    }
    case 'taxId': {
      error = (value && value.length !== 0) ? '' : 'Please enter your federal tax id';
      break;
    }
    default:
  }
  return error;
}
