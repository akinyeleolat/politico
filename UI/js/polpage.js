
const viewCandidate = document.getElementById('view_candidate');
const voteCandidate = document.getElementById('vote_candidate');
const runOffice = document.getElementById('run_office');

const headerTitle = document.getElementById('myHeader');
const modal = document.getElementById('myModal');
var officeForm = document.getElementById("getForm");

const span = document.getElementsByClassName('close')[0];

const officeView = document.getElementById('officeView');
const officeSelect = document.getElementById('currentOffice');

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

span.onclick = function() {
    modal.style.display = "none";
    officeForm.innerHTML = null;
  }
  
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  