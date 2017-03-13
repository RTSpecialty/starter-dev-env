import delay from './delay';

let nextId = 2;
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
  {
    id: 1,
    type: 'agent',
    username: 'jeremy.fowler@rtspecialty.com',
    firstName: 'Jeremy',
    lastName: 'Fowler',
    organization: 'R-T Specialty',
    password: '12345',
  },
];

const defaultUser = {
  id: 0,
  type: 'agent',
  organization: 'New User',
};

class UserApi {
  static loginUser(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex(user => user.username === username);
        const user = { ...users[index] };
        if (user.password === password) {
          delete user.password;
          resolve(user);
        } else {
          reject('Login Failed');
        }
      }, delay);
    });
  }

  static registerUser(saved) {
    return new Promise((resolve, reject) => {
      const user = { ...defaultUser, ...saved };
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 2;

        if (user.firstName.length < minUserNameLength) {
          return reject(`First Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          return reject(`Last Name must be at least ${minUserNameLength} characters.`);
        }

        const existing = users.findIndex(a => a.username === user.username);
        if (existing !== -1) {
          return reject('That email has already been registered.');
        }

        user.id = nextId;
        nextId += 1;
        users.push(user);
        return resolve(user);
      }, delay);
    });
  }

  static savePassword(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
          return reject('User not found');
        }

        // Simulate server-side validation
        const minPasswordLength = 8;
        if (password < minPasswordLength) {
          return reject(`Password must be at least ${minPasswordLength} characters.`);
        }

        const user = { ...users[index] };
        delete user.password;
        users[index] = { ...user, password };
        return resolve(user);
      }, delay);
    });
  }

  static saveUser(id, saved) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = users.findIndex(user => user.id === id);
        if (index === -1) {
          return reject('User not found');
        }

        const user = { ...users[index], ...saved };
        // Simulate server-side validation
        const minUserNameLength = 2;
        if (user.firstName.length < minUserNameLength) {
          return reject(`First Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          return reject(`Last Name must be at least ${minUserNameLength} characters.`);
        }

        const existing = users.findIndex(a => a.username === user.username && a.id !== user.id);
        if (existing !== -1) {
          return reject('That email has already been registered.');
        }

        users[index] = user;
        return resolve(user);
      }, delay);
    });
  }
}

export default UserApi;
