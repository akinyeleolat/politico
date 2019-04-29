/* fetch all office*/
let officeData = document.getElementById('officeList') 
const fetchAllOffice = () => {
    const host = 'https://ngpolitico.herokuapp.com';
    const url = `${host}/api/v1/offices`;
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
        viewOffice = data.data;
        let outputOffice = `<h1><i class="fas fa-users"></i> Office</h1>
        <table>
            <tr>
                <th>Office Name</th>
                <th>Office Type</th>
                <th>Date Created</th>
                <th></th>
            </tr>`;
        viewOffice.forEach((office) => {
            outputOffice +=`
            <tr id="${office.id}">
                                <td>${office.officename.toUpperCase()}</td>
                                <td>${office.officetype.toUpperCase()}</td>
                                <td>${office.created_at.toUpperCase()}</td>
                                <td>
                                    <button><i class="fas fa-search"></i></button>
                                    <button><i class="far fa-edit"></i></button>
                                    <button><i class="fas fa-trash-alt"></i></button>
                                </td>
                            </tr>`
        });
        outputOffice +=`</table>`
        officeData.innerHTML = outputOffice;
      }
      else{
        officeData.innerHTML = data.error;
      }
    })
    .catch((error) => {
        officeData.innerHTML = error;
    })
  }
  