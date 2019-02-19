/* Drop down button*/
 var dropdown = document.getElementsByClassName("dropdown-btn");
 var i;
 
 for (i = 0; i < dropdown.length; i++) {
   dropdown[i].addEventListener("click", function() {
   this.classList.toggle("active");
   var dropdownContent = this.nextElementSibling;
   if (dropdownContent.style.display === "block") {
   dropdownContent.style.display = "none";
   } else {
   dropdownContent.style.display = "block";
   }
   });
 }

var headerTitle = document.getElementById("myHeader");
var modal = document.getElementById('myModal');


var pName;
var hqAddress;
var officeForm = document.getElementById("getForm");



var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var editBtn = document.getElementById("editParty");
var officeBtn = document.getElementById("officeBtn");
var deleteParty = document.getElementById("partyName");


var span = document.getElementsByClassName("close")[0];

let  imageLink;
let databody;
let logoUrl;
btn.onclick = function() {
  let logoUrl;
  modal.style.display = "block";
  headerTitle.innerHTML = "CREATE NEW PARTY";
  officeForm.innerHTML =`<form id="createParty"><p style="text-align: right"><a href="#" id="upload_widget_opener"><button class="button_3">Upload Party Logo</button></a></p>
  <p><input type="text" id="pName" placeholder="Party Name" required></p>
  <p><input type="text" id="pDetails" placeholder="Party Detail" required></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address" required></textarea></p>
  <p><input type="submit" id="formBtn" value="Create Party"  class="button_1"></p></form>
  <div id="responseMsg"></div>`
  /* Image upload*/
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
    let imageLink = result.info.url;
    localStorage.setItem('logoUrl', imageLink);
  }
})
const createParty = document.getElementById('createParty');
 createParty.addEventListener('submit', addParty);
}
/* edit button function */
editBtn.onclick = function(){
  modal.style.display = "block";
  headerTitle.innerHTML = "EDIT PARTY";
  pName = "NYP";
  hqAddress = "IKEJA,LAGOS";
  officeForm.innerHTML =`
  <form><p style="text-align: right"><a href="#"><button class="button_3">New Logo</button></a></p>
  <p><input type="text" id="pName" value=${pName} placeholder="Party Name"></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address"> ${hqAddress}</textarea></p>
  <p><input type="submit" id="formBtn" value="Update Party"  class="button_1"></p></form>`;
}
officeBtn.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML  = "CREATE NEW OFFICE";
  officeForm.innerHTML = `
  <form id="createOffice"><p><input type="text" id="officeName" placeholder="Office Name" required></p>
  <p><select name="office-type" id="officeType">
      <option value="Federal">Federal</option>
      <option value="State">State</option>
      <option value="LGA">Local Government</option>
    </select></p>
  <p><input type="submit" id="office-formBtn" value="Create Office" class="button_1"></p>
  </form>
  <div id="responseOfficeMsg"></div>
  `
  const createOffice = document.getElementById('createOffice');
 createOffice.addEventListener('submit', addOffice);
}
deleteParty.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML = "DELETE PARTY ?";
  pName = "NYP";
  hqAddress = "IKEJA,LAGOS";
  officeForm.innerHTML =`
  <form>
  <p><input type="text" id="pName" value=${pName} placeholder="Party Name" readonly></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address" readonly> ${hqAddress}</textarea></p>
  <p><input type="submit" id="formBtn" value="Delete Party"  class="button_1"></p></form>`;
}

span.onclick = function() {
  modal.style.display = "none";
  location.reload(true);
  officeForm.innerHTML = null;
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function openTab(evt, tabName) {
  let i;
  let tabcontent;
  let tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

var deleteParty = document.getElementById("partyName");

var partyMsg = document.getElementById("partyMsg");

/* Onload function */
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
}
/* log out user*/
const logout = document.getElementById('logout');
const logoutUser = (e) => {
    const loginPage = './login.html'
    e.preventDefault();
    localStorage.clear();
    window.location.replace(`${loginPage}`);
};
logout.addEventListener('click', logoutUser);

