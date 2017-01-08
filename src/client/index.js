
import { getUsers, deleteUser } from './api/users';
import './index.css';

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<tr>
    <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.email}</td>
    </tr>`;
  });

  global.document.getElementById('users').innerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Must use array.from to create a real array from a DOM collection
  // getElementByClassName only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = e => {
      e.preventDefault();
      const el = e.target;
      const row = el.parentNode.parentNode;
      deleteUser(el.attributes["data-id"].value);
      row.parentNode.removeChild(row);
    }
  });
});
