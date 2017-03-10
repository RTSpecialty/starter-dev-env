import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
  {
    username: 'jeremy.fowler@rtspecialty.com',
    firstName: 'Jeremy',
    lastName: 'Fowler',
    organization: 'R-T Specialty',
    password: '12345',
  },
];

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
      const user = { ...saved }; // to avoid manipulating object passed in.
      setTimeout(() => {
        // Simulate server-side validation
        const minUserNameLength = 3;

        if (user.firstName.length < minUserNameLength) {
          reject(`First Name must be at least ${minUserNameLength} characters.`);
        }

        if (user.lastName.length < minUserNameLength) {
          reject(`Last Name must be at least ${minUserNameLength} characters.`);
        }

        const existing = users.findIndex(a => a.username === user.username);
        if (existing !== -1) {
          reject('That email has already been registered.');
        }

        users.push(user);
        resolve(user);
      }, delay);
    });
  }
}

  // static saveAuthor(saved) {
  //   const author = Object.assign({}, saved); // to avoid manipulating object passed in.
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       // Simulate server-side validation
  //       const minAuthorNameLength = 3;
  //       if (author.firstName.length < minAuthorNameLength) {
  //         reject(`First Name must be at least ${minAuthorNameLength} characters.`);
  //       }
  //
  //       if (author.lastName.length < minAuthorNameLength) {
  //         reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
  //       }
  //
  //       if (author.id) {
  //         const existingAuthorIndex = authors.findIndex(a => a.id === author.id);
  //         authors.splice(existingAuthorIndex, 1, author);
  //       } else {
  //         // Just simulating creation here.
  //         // The server would generate ids for new authors in a real app.
  //         // Cloning so copy returned is passed by value rather than by reference.
  //         author.id = generateId(author);
  //         authors.push(author);
  //       }
  //
  //       resolve(author);
  //     }, delay);
  //   });
  // }
  //
  // static deleteAuthor(authorId) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const index = authors.findIndex(author => author.id === authorId);
  //       authors.splice(index, 1);
  //       resolve();
  //     }, delay);
  //   });
  // }
// }

export default UserApi;
