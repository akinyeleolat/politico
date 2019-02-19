/* fetech Create Party */
const createParty = (url, databody) => {
    const token = localStorage.getItem('token');
  fetch(url, {
    method:'POST',
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
      if (data.status === 201) {
        const partyName = data.data[0].party.partyName;
        responseMsg.innerHTML = `${partyName} created`;
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
      responseMsg.innerHTML = error
    });
  };
  /* Add party */
  const addParty = (event) =>{
    event.preventDefault();
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/parties`;
     /* Event Listeners*/
   let responseMsg = document.getElementById('responseMsg');
   let logoUrl = localStorage.getItem('logoUrl');
   let partyName = document.getElementById('pName').value.trim();
   let partyDetail = document.getElementById('pDetails').value.trim();
   let hqAddress = document.getElementById('hqAddress').value.trim();
   databody = JSON.stringify({
    partyName,
    partyDetail,
    hqAddress,
    logoUrl,
  });
  createParty(url,databody);
  }
  