// credit w3schools tutorial as a guide
// drop down
 /* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
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
// modal window
// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = () => {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Toggle Tab

function openOrder(evt, OrderName) {
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
  document.getElementById(OrderName).style.display = "block";
  evt.currentTarget.className += " active";
}


// Toggle Side Panel
function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
