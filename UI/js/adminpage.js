// credit w3schools tutorial as a guide
// Get the modal
var headerTitle = document.getElementById("myHeader");
var modal = document.getElementById('myModal');

// Get the form element
var pName = document.getElementById("pName");
var hqAddress = document.getElementById("hqAddress");
var formBtn = document.getElementById("formBtn");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var editBtn = document.getElementById("editParty");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  headerTitle.innerHTML = "CREATE NEW PARTY";
  formBtn.value="Create"
}

editBtn.onclick = function(){
  modal.style.display = "block";
  headerTitle.innerHTML = "EDIT PARTY";
  pName.value = "NYP";
  hqAddress.innerHTML = "IKEJA,LAGOS";
  formBtn.value="Update"
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Toggle Tab

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


// Toggle Side Panel
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

var deleteParty = document.getElementById("partyName");
deleteParty.onclick = deletePartyData;
var partyMsg = document.getElementById("partyMsg");

function deletePartyData() {
  alert('party Deleted');
} 