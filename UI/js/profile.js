const token = localStorage.getItem('token')
window.onload = () => {
  if (!token) {
    window.location.replace('./login.html')
    alert('Kindly login or create Account')
  }
  else {
    fetchUserProfile()
  }
}

const fetchUserProfile = () => {
    const userprofile = localStorage.getItem('users');
    user = JSON.parse(userprofile);
    document.getElementById('username').innerHTML = `${user.lastname.toUpperCase()}, ${user.firstname.toUpperCase()}`;
    document.getElementById('fullname').innerHTML = `${user.lastname.toUpperCase()}, ${user.firstname.toUpperCase()}`;
    document.getElementById('userImage').innerHTML = `<img src="${user.passporturl}" width="100px"
    height="100px">`
    document.getElementById('email').innerHTML = `${user.email.toUpperCase()}`;
}