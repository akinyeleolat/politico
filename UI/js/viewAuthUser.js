/* fetch all users*/
let userData = document.getElementById('userList');
const fetchAuthUser = () => {
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/auth/users`;
    const bearer = `${token}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token':bearer,
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) { 
        viewUser = data.data;
        let outputUser = `<h1><i class="fas fa-users"></i> Authenticated user</h1>
        <table>
            <tr>
                <th>UserID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Passport</th>
                <th></th>
            </tr>`;
        viewUser.forEach((user) => {
            outputUser +=`
            <tr id="${user.id}">
                                <td>${user.id}</td>
                                <td>${user.lastname.toUpperCase()}</td>
                                <td>${user.firstname.toUpperCase()}</td>
                                <td>${user.email.toLowerCase()}</td>
                                <td><img src="${user.passporturl}"></td>
                                <td>
                                    <button><i class="fas fa-search"></i></button>
                                    <button><i class="far fa-edit"></i></button>
                                    <button><i class="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>`
        });
        outputUser +=`</table>`
        userData.innerHTML = outputUser;
      }
      else{
        userData.innerHTML = data.error;
      }
    })
    .catch((error) => {
        userData.innerHTML = error;
    })
  }
  