
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
var editBtn = document.getElementById("editParty");
var officeBtn = document.getElementById("officeBtn");
var deleteParty = document.getElementById("partyName");


var span = document.getElementsByClassName("close")[0];

 
btn.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML = "CREATE NEW PARTY";
  officeForm.innerHTML =`<p style="text-align: right"><a href="#"><button class="button_3">Upload Logo</button></a></p>
  <p><input type="text" id="pName" placeholder="Party Name"></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address"></textarea></p>
  <p><input type="submit" id="formBtn" value="Create Party"  class="button_1"></p>`
}

editBtn.onclick = function(){
  modal.style.display = "block";
  headerTitle.innerHTML = "EDIT PARTY";
  pName = "NYP";
  hqAddress = "IKEJA,LAGOS";
  officeForm.innerHTML =`<p style="text-align: right"><a href="#"><button class="button_3">New Logo</button></a></p>
  <p><input type="text" id="pName" value=${pName} placeholder="Party Name"></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address"> ${hqAddress}</textarea></p>
  <p><input type="submit" id="formBtn" value="Update Party"  class="button_1"></p>`;
}
officeBtn.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML  = "CREATE NEW OFFICE";
  officeForm.innerHTML = `
  <p><input type="text" id="officeName" placeholder="Office Name"></p>
  <p><select name="office-type">
      <option value="Federal">Federal</option>
      <option value="State">State</option>
      <option value="LGA">Local Government</option>
    </select></p>
  <p><input type="submit" id="office-formBtn" value="Create Office" class="button_1"></p>`
}
deleteParty.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML = "DELETE PARTY ?";
  pName = "NYP";
  hqAddress = "IKEJA,LAGOS";
  officeForm.innerHTML =`
  <p><input type="text" id="pName" value=${pName} placeholder="Party Name" readonly></p>
  <p><textarea  id="hqAddress" placeholder="Headquarter Address" readonly> ${hqAddress}</textarea></p>
  <p><input type="submit" id="formBtn" value="Delete Party"  class="button_1"></p>`;
}

span.onclick = function() {
  modal.style.display = "none";
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

function deletePartyData() {
  alert('party Deleted');
} 
