
const viewCandidate = document.getElementById('view_candidate');
const voteCandidate = document.getElementById('vote_candidate');

const officeView = document.getElementById('officeView');

viewCandidate.onclick = () =>{
    officeView.innerHTML = `<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
</div>
<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
</div>
<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
</div>
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
</div>           
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    </div>
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>                           
</div>`
}
voteCandidate.onclick = () =>{
    officeView.innerHTML= `<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>
</div>
<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>
</div>
<div class="card">
    <img src="./img/userprofile2.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>
</div>
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>
</div>           
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>
</div>
<div class="card">
    <img src="./img/userprofile.jpg">
    Ebele Julius
    <p>NYP</p>
    <p>National Youth Party</p>
    <p><button class="button_1" style="float:right"><i class="fas fa-check-circle"></i></button></p>                           
</div>`
}
const token = localStorage.getItem('token')
window.onload = () => {
  if (!token) {
    window.location.replace('./login.html')
  }
  else {
    fetchUserProfile();
    fetchAllParty();
  }
}

/* fetch user details from local storage */
const fetchUserProfile = () => {
    const userprofile = localStorage.getItem('users');
    user = JSON.parse(userprofile);
    document.getElementById('username').innerHTML = `${user.lastname.toUpperCase()}, ${user.firstname.toUpperCase()}`;
    document.getElementById('userImage').innerHTML = `<img src="${user.passporturl}" width="50px"
    height="50px">`
}
/* log out user*/
const logout = document.getElementById('logout');
const logoutUser = (e) => {
    const loginPage = './login.html'
    e.preventDefault();
    localStorage.clear();
    window.location.replace(`${loginPage}`);
};
logout.addEventListener("click", logoutUser);