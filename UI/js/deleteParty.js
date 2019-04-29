/* Get the party Id and party details */
partyList = document.querySelector('#partyList');
document.addEventListener('click', e => {
    if ((e.target.matches('button')) && (e.target.classList=='deleteBtn') ) {
      partyId = e.target.id;
      const partyName = document.getElementById(`partyName${partyId}`).innerHTML;
      const partyDetail = document.getElementById(`partyDetail${partyId}`).innerHTML;
     modal.style.display = "block";
     headerTitle.innerHTML = "DELETE PARTY";
     officeForm.innerHTML =`
     <form id="deleteParty">
     <p><input type="text" id="pName"  readonly></p>
     <p><input type="text" id="pDetails"  readonly></p>
     <p><input type="submit" id="formBtn" value="Delete Party"  class="button_1"></p></form>
     <div id="responseEditMsg"></div>`;
     document.getElementById('pName').value = partyName;
     document.getElementById('pDetails').value = partyDetail;
    const deleteParty = document.getElementById('deleteParty');
    deleteParty.addEventListener('submit', deletePartyData);
    deleteParty.partyId = partyId;
    }
  });
  /* fetch edit Party */
const deletePartyDetail = (url, responseMsg) => {
  const token = localStorage.getItem('token');
fetch(url, {
  method:'DELETE',
  headers:{
    'Accept':'application/json',
    'Authorization':token,
    'token': token,
    'Content-Type':'application/json'
  }
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
/* Delete party*/
  const deletePartyData = (event) => {
    event.preventDefault();
    let partyId = event.target.partyId;
    let responseMsg =  document.getElementById('responseEditMsg');
    
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/parties/${partyId}`;
    deletePartyDetail(url,responseMsg);
  }

