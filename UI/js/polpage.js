// Get the button that opens the modal
const viewCandidate = document.getElementById('view_candidate');
const voteCandidate = document.getElementById('vote_candidate');
const runOffice = document.getElementById('run_office');
// Get the modal
const headerTitle = document.getElementById('myHeader');
const modal = document.getElementById('myModal');
var officeForm = document.getElementById("getForm");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];
// get the view page
const officeView = document.getElementById('officeView');
const officeSelect = document.getElementById('currentOffice');
//function
runOffice.onclick = () =>{
    modal.style.display = "block";
    headerTitle.innerHTML = ` Run for ${officeSelect.value}`;
    officeForm.innerHTML = `
  <p><input type="checkbox" name="vehicle" value="Yes" checked="checked"> You have indicated to run for ${officeSelect.value}<br></p>
  <p><input type="submit" id="office-formBtn" value="Apply for Office" class="button_1"></p>`
}
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
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    officeForm.innerHTML = null;
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  