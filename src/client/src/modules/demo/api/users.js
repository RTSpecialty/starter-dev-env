import 'whatwg-fetch';

const BaseUrl = 'http://localhost:3001';

export function getUsers() {
  return get(`${BaseUrl}/users`);
}

export function deleteUser(id){
  return del(`${BaseUrl}/users/${id}`);
}

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function del(url) {
  const request = new Request(url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
