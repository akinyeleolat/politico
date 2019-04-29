/* Get the party Id and party details */
let partyList = document.querySelector('#partyList');
document.addEventListener('click', e => {
    if ((e.target.matches('button')) && (e.target.classList=='updateBtn') ) {
      partyId = e.target.id;
      const partyName = document.getElementById(`partyName${partyId}`).innerHTML;
      const partyDetail = document.getElementById(`partyDetail${partyId}`).innerHTML;
     modal.style.display = "block";
     headerTitle.innerHTML = "EDIT PARTY";
     officeForm.innerHTML =`
     <form id="updateParty">
     <p><input type="text" id="pName"  required></p>
     <p><input type="text" id="pDetails"  required></p>
     <p><input type="submit" id="formBtn" value="Update Party"  class="button_1"></p></form>
     <div id="responseEditMsg"></div>`;
     document.getElementById('pName').value = partyName;
     document.getElementById('pDetails').value = partyDetail;
    const updateParty = document.getElementById('updateParty');
    updateParty.addEventListener('submit', updatePartyName);
    updateParty.partyId = partyId;
    }
  });
  /* fetch edit Party */
const editParty = (url, databody,responseMsg) => {
  const token = localStorage.getItem('token');
fetch(url, {
  method:'PATCH',
  headers:{
    'Accept':'application/json',
    'Authorization':token,
    'token': token,
    'Content-Type':'application/json'
  },
  body:databody
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status === 200) {
      const message = data.message;
      responseMsg.innerHTML = message;
    }
    else {
      const error = data.error;
      let errorMsg = '';
      if(error){
            errorMsg = error;
      }
      responseMsg.innerHTML = errorMsg;
    }
  })
  .catch((error) => {
    responseMsg.innerHTML = error;
  });
};
/* update party name*/
  const updatePartyName = (event) => {
    event.preventDefault();
    let partyId = event.target.partyId;
    let responseMsg =  document.getElementById('responseEditMsg');
    let newPartyName = document.getElementById('pName').value.trim();
    let newPartyDetail = document.getElementById('pDetails').value.trim();
    const databody = JSON.stringify({
      partyName: newPartyName,
      partyDetail: newPartyDetail,
    })
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/parties/${partyId}/name`;
    editParty(url,databody,responseMsg);
  }

