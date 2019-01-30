const partyName = 'SDP';
const partyDetail = 'Social Democratic Party';
const logoUrl = 'http://www.logo.com/SDP';

/**
* This is a valid party data
* @exports partyData1
* */
export const partyData1 = {
  partyName,
  partyDetail,
  logoUrl,
};
/**
* This is empty party Name
* @exports partyData2
* */
export const partyData2 = {
  partyName: '',
  partyDetail,
  logoUrl,
};
/**
* This is party Name with space
* @exports partyData3
* */
export const partyData3 = {
  partyName: ' ',
  partyDetail,
  logoUrl,
};
/**
* This is empty party detail
* @exports partyData4
* */
export const partyData4 = {
  partyName,
  partyDetail: '',
  logoUrl,
};
/**
* This is party detail with space
* @exports partyData5
* */
export const partyData5 = {
  partyName,
  partyDetail: ' ',
  logoUrl,
};

/**
* This is party name and detail that is number
* @exports partyData6
* */
export const partyData6 = {
  partyName: 212,
  partyDetail: 223,
  logoUrl,
};
/**
* This is empty logo url
* @exports partyData7
* */
export const partyData7 = {
  partyName,
  partyDetail,
  logoUrl: '',
};
/**
* This is logo url with spaces
* @exports partyData8
* */
export const partyData8 = {
  partyName,
  partyDetail,
  logoUrl: ' ',
};
/**
* This is invalid logo url
* @exports partyData9
* */
export const partyData9 = {
  partyName,
  partyDetail,
  logoUrl: 'www.logourl/asd',
};
