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
        let outputParty = `<h1><i class="fas fa-users"></i> Parties</h1>
        <div class="card">
        <img src="./img/userprofile.jpg">
        <p>NYP</p>
        <button class="button_1"  style="float:left" id="editParty"><i class="far fa-edit"></i></button>
        <button class="button_3" style="float:right" id="partyName"><i class="fas fa-trash-alt"></i></button>
        </div>`;
        viewParty.forEach((party) => {
            outputParty +=`<div class="card" id="${party.id}">
            <img src="${party.logourl}">
            <p>${party.partyname.toUpperCase()}</p>
            <p>${party.partydetail.toUpperCase()}</p>
            <p>${party.hqaddress.toUpperCase()}</p>
            <button class="button_1"  style="float:left" id="editParty${party.id}"><i class="far fa-edit"></i></button>
            <button class="button_3" style="float:right" id="partyName${party.id}"><i class="fas fa-trash-alt"></i></button>
            </div>`
        });
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