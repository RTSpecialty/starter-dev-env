import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const localstore = (typeof localStorage !== 'undefined')
  ? localStorage
  : { getItem: () => null, setItem: () => {} };

const localUsers = localstore.getItem('users');
const users = (localUsers)
  ? JSON.parse(localUsers)
  : {};

const getNextId = () => Object.keys(users).length + 1;

const getUserFromUsername = (username) => {
  const keys = Object.keys(users);
  const key = keys.findIndex(idx => users[idx].username === username);
  const id = keys[key];
  return (id !== -1) ? users[id] : null;
};

const defaultUser = {
  id: 0,
  type: 'agent',
  organization: 'New User',
};

const storeUser = (id, saved) => {
  const user = { ...defaultUser, ...saved };
  if (id) {
    users[id] = user;
  } else {
    const nextId = getNextId();
    user.id = nextId;
    users[nextId] = user;
  }
  localstore.setItem('users', JSON.stringify(users));
  return { ...user, password: null }; // cleanse data
};

class UserApi {
  static loginUser(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = getUserFromUsername(username);
        if (user && user.password === password) {
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

        const existing = getUserFromUsername(user.username);
        if (existing) {
          return reject('That email has already been registered.');
        }

        return resolve(storeUser(null, user));
      }, delay);
    });
  }

  static savePassword(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject('User not found');
        }

        // Simulate server-side validation
        const minPasswordLength = 8;
        if (password < minPasswordLength) {
          return reject(`Password must be at least ${minPasswordLength} characters.`);
        }

        return resolve(storeUser(id, { ...users[id], password }));
      }, delay);
    });
  }

  static saveUser(id, saved) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject('User not found');
        }

        const user = { ...users[id], ...saved };
        // Simulate server-side validation
        const minUserNameLength = 2;
        if (user.firstName.length < minUserNameLength) {
          return reject(`First Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          return reject(`Last Name must be at least ${minUserNameLength} characters.`);
        }

        const existing = getUserFromUsername(user.username);
        if (existing.id !== user.id) {
          return reject('That email has already been registered.');
        }

        return resolve(storeUser(id, user));
      }, delay);
    });
  }
}

export default UserApi;
