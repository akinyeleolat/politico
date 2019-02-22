/* fetch all aprty*/
let partyData = document.getElementById('partyList') 
const fetchAllParty = () => {
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/parties`;
    const bearer = `${token}`
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token':bearer,
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) { 
        viewParty = data.data;
        let outputParty = `<h1><i class="fas fa-users"></i> Parties</h1>`;
        viewParty.forEach((party) => {
            outputParty +=`<div class="card" id="${party.id}">
            <img src="${party.logourl}">
            <p id="partyName${party.id}">${party.partyname.toUpperCase()}</p>
            <p id="partyDetail${party.id}">${party.partydetail.toUpperCase()}</p>
            <p>${party.hqaddress.toUpperCase()}</p>
            <button class="updateBtn"  style="float:left" id="${party.id}"><i class="far fa-edit"></i></button>
            <button class="deleteBtn" style="float:right" id="${party.id}"><i class="fas fa-trash-alt"></i></button>
            </div>`
        })
        partyData.innerHTML = outputParty;
      }
      else{
        partyData.innerHTML = data.error;
      }
    })
    .catch((error) => {
        partyData.innerHTML = error;
    })
  }