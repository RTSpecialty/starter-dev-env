/* eslint-disable import/prefer-default-export */

export function validate(name, value) {
  let error = '';
  switch (name) {
    case 'agencyName': {
      error = (value && value.length !== 0) ? '' : 'Please enter your agency name';
      break;
    }
    case 'classification': {
      error = (value && value.length !== 0) ? '' : 'Please pick a federal tax classification';
      break;
    }
    case 'taxId': {
      error = (value && value.length !== 0) ? '' : 'Please enter a federal tax id';
      break;
    }
    default:
  }
  return error;
}
