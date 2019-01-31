/** Method for getting all parties. */
// eslint-disable-next-line import/no-mutable-exports
let offices = [{
  id: 1,
  officeName: 'Ikeja Senatorial District',
  officeType: 'federal',
},
{
  id: 2,
  officeName: 'Ayedaade Member House of Rep',
  officeType: 'state',
}];
function officesData(value) {
  offices = value;
}
export { offices, officesData };
