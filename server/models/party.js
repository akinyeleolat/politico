/** Method for getting all parties. */

  let party = [{
    id: 1,
    partyName: 'SDP',
    partyDetail: 'Social Democratic Party',
    logoUrl: 'http://www.logo.com/SDP',
  },
  {
    id: 2,
    partyName: 'PDP',
    partyDetail: 'People Democratic Party',
    logoUrl: 'http://www.logo.com/PDP',
  }];

  function partyData(value) {
    party = value;
  }
  
  export { party, partyData };

