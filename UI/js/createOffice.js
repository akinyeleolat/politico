
/* fetech Create office */
const createOffice = (url, databody) => {
    const token = localStorage.getItem('token');
    let responseMsg = document.getElementById('responseOfficeMsg');
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
        const officeName = data.data[0].office.officeName;
        responseMsg.innerHTML = `${officeName} created`;
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
  /* Add office */
const addOffice = (event) =>{
  event.preventDefault();
  let responseMsg = document.getElementById('responseOfficeMsg');
  const officeName = document.getElementById('officeName').value.trim();
  const officeType = document.getElementById('officeType').value;
  let databody = JSON.stringify({
    officeName,
    officeType,
  });
  const host = 'https://ngpolitico.herokuapp.com';
  const url = `${host}/api/v1/offices`;
   /* Event Listeners*/
  createOffice(url,databody);
}
