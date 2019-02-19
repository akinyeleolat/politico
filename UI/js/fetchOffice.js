/* fetch all aprty*/
let officeData = document.getElementById('viewOffice');
const fetchOffice = () => {
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
        viewOffice.forEach((office) => {
            const option = document.createElement('option')
            option.text = `${office.officename}`
            option.value = `${office.id}`
            officeData.add(option);
        });
      }
      else{
        // officeData.innerHTML = data.error;
      }
    })
    .catch((error) => {
        // officeData.innerHTML = error;
    })
  }