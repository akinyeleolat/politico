/*login user account with fetch*/
const userLogin = (url, databody) => {
  fetch(url, {
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:databody
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        const token = data.data.token;
        const user = data.data.user;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('users', JSON.stringify(user));
        const adminHome = './admin.html';
        const userHome = './userhome.html';
        if(user.isAdmin){
            redirectHome = adminHome;
        }
        else{
            redirectHome = userHome;
        }
        window.location.replace(`${redirectHome}`);
      }
      else {
        const error = data.error;
        let errorMsg = '';
        if(error){
            errorMsg +=error;
        }
        document.getElementById('responseMsg').innerHTML = errorMsg;
      }
    })
    .catch((error) => {
      document.getElementById('responseMsg').innerHTML = error
    });
};
const loginUser = (event) => {
    event.preventDefault()
    
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()
    if (!email || !password) {
      document.getElementById('responseMsg').innerHTML = 'values required';
    }
    else {
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/auth/login`;
    /*Data body*/
      const databody = JSON.stringify({
      email,
      password,
    })
    userLogin(url,databody)
  }
  }
document.getElementById('loginForm').addEventListener('submit', loginUser);
