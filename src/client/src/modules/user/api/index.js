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

const storeUser = (id, saved) => {
  const user = { ...saved };
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

const defaultUser = {
  id: 0,
  status: 'new',
  type: 'agent',
  auth: { agency: ['welcome'] },
  completed: { agency: [] },
  organization: 'New User',
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
          reject(new Error('Login Failed'));
        }
      }, delay);
    });
  }

  static registerUser(saved) {
    return new Promise((resolve, reject) => {
      const user = { ...defaultUser, ...saved, username: saved.username.toLowerCase() };
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 2;

        if (user.firstName.length < minUserNameLength) {
          return reject(new Error(`First Name must be at least ${minUserNameLength} characters.`));
        }

        if (user.lastName.length < minUserNameLength) {
          return reject(new Error(`Last Name must be at least ${minUserNameLength} characters.`));
        }

        const existing = getUserFromUsername(user.username);
        if (existing) {
          return reject(new Error('That email has already been registered.'));
        }

        return resolve(storeUser(null, user));
      }, delay);
    });
  }

  static savePassword(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject(new Error('User not found'));
        }

        // Simulate server-side validation
        const minPasswordLength = 8;
        if (password < minPasswordLength) {
          return reject(new Error(`Password must be at least ${minPasswordLength} characters.`));
        }
        const user = { ...users[id], password };
        user.status = (user.status === 'new') ? 'active' : user.status;
        return resolve(storeUser(id, user));
      }, delay);
    });
  }

  static saveUser(id, saved) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject(new Error('User not found'));
        }

        const user = { ...users[id], ...saved };
        // Simulate server-side validation
        const minUserNameLength = 2;
        if (user.firstName.length < minUserNameLength) {
          return reject(new Error(`First Name must be at least ${minUserNameLength} characters.`));
        }

        if (user.lastName.length < minUserNameLength) {
          return reject(new Error(`Last Name must be at least ${minUserNameLength} characters.`));
        }

        const existing = getUserFromUsername(user.username);
        if (existing.id !== user.id) {
          return reject(new Error('That email has already been registered.'));
        }

        return resolve(storeUser(id, user));
      }, delay);
    });
  }

  static addAuth(id, scope, role) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject(new Error('User not found'));
        }

        const user = { ...users[id] };
        const auth = { ...user.auth };
        const roles = [...auth[scope]];
        if (!roles.includes(role)) {
          roles.push(role);
          auth[scope] = roles;
          user.auth = auth;
          return resolve(storeUser(id, user));
        }

        return resolve(user);
      }, delay);
    });
  }

  static addCompleted(id, scope, component) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!users[id]) {
          return reject(new Error('User not found'));
        }

        const user = { ...users[id] };
        const completed = { ...user.completed };
        const components = [...completed[scope]];
        if (!components.includes(component)) {
          components.push(component);
          completed[scope] = components;
          user.completed = completed;
          return resolve(storeUser(id, user));
        }

        return resolve(user);
      }, delay);
    });
  }
}

export default UserApi;
