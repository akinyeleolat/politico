/** Method for getting all parties. */

let offices = [{
    id:1,
    officeName:"Ikeja Senatorial District",
    officeType:"Federal",
    },
    {
    id:2,
    officeName:"Ayedaade Member House of Rep",
    officeType:"State",
    }];

  function officesData(value) {
    offices = value;
  }
  
  export { offices, officesData };