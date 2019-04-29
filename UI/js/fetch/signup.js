let  imageLink;
/*handle image upload*/
const widgetOpener = document.getElementById('upload_widget_opener');
cloudinary.applyUploadWidget(widgetOpener,{ 
  cloudName: 'akinyeleolat',
  uploadPreset: 'politico',
  cropping: true,
  folder: 'politico'
}, (error, result) => {
  if (result && result.event === 'success') {
    /*Get image Url*/
    imageLink = result.info.url
    return imageLink
  }
})
/*create user account with fetch*/
const createAccount = (url, databody) => {
    const redirectHome = '../userhome.html';
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
      if (data.status === 201) {
        const token = data.data.token;
        const user = data.data.user;
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('users', JSON.stringify(user));
        window.location.replace(`${redirectHome}`);
      }
      else {
        const error = data.error;
        let errorMsg = '';
        if(error){
            for(let i=0; i<error.length;i++){
              errorMsg +='<br>* '+error[i];
            }
        }
        document.getElementById('responseMessage').innerHTML = errorMsg;
      }
    })
    .catch((error) => {
      document.getElementById('responseMessage').innerHTML = error
    });
};
/* Create User Account*/
const addUser = (event) => {
  event.preventDefault()
  /*get form input*/
  const firstname = document.getElementById('firstname').value.trim()
  const lastname = document.getElementById('lastname').value.trim()
  const othername = document.getElementById('othername').value.trim()
  const email = document.getElementById('email').value.trim()
  const phonenumber = document.getElementById('phonenumber').value.trim()
  const password = document.getElementById('password').value.trim()
  const password2 = document.getElementById('confirm_password').value.trim()
  
  const imageUrl =  imageLink
  
  /*check password matched*/
  if (password !== password2) {
    document.getElementById('responseMessage').innerHTML = 'Password not matched';
  }
  else {
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/auth/signup`;

    /*Data body*/
    const databody = JSON.stringify({
      lastname,
      firstname,
      othername,
      email,
      phonenumber,
      password,
      passporturl:imageUrl,
    })
    createAccount(url,databody)  
}
}

document.getElementById('createAccount').addEventListener('submit', addUser)
