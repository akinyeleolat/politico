const loginUser = (event) => {
    event.preventDefault()
    
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()
    if (!email || !password) {
      document.getElementById('responseMsg').innerHTML = 'values required';
      alert('values required');
    }
    else {
        const adminHome = './admin.html';
        const userHome = './userhome.html';
        const polHome = './pol-home.html';
        if(email =='admin@gmail.com' && password=='admin'){
            window.location.replace(`${adminHome}`)
        }
       else if(email =='oluwatosin@gmail.com' && password=='admin'){
           window.location.replace(`${userHome}`)
       }
       else if(email =='politician@gmail.com' && password=='admin'){
        window.location.replace(`${polHome}`)
       }
       else{
        document.getElementById('responseMsg').innerHTML = 'Incorrect username and password';
       }
  }
  }
document.getElementById('loginForm').addEventListener('submit', loginUser);
