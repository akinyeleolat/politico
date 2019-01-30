// Get the button that opens the modal
const viewCandidate = document.getElementById('view_candidate');
const voteCandidate = document.getElementById('vote_candidate');
// get the view page
const officeView = document.getElementById('officeView');
//function
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
