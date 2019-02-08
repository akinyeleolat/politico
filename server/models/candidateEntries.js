const office = 1;
const party = 1;

/**
* This is a valid candidate
* @exports candidateData1
* */
export const candidateData1 = {
  office,
  party,
};
/**
* This is empty office in req.body
* @exports candidateData2
* */
export const candidateData2 = {
  party,
};
/**
* This is empty party in req.body
* @exports candidateData3
* */
export const candidateData3 = {
  office,
};
/**
* This is empty office
* @exports candidateData4
* */
export const candidateData4 = {
  office: '',
  party,
};
/**
* This is office  with space
* @exports candidateData5
* */
export const candidateData5 = {
  office: ' ',
  party,
};
/**
* This is office and party id that is alphabet
* @exports candidateData6
* */
export const candidateData6 = {
  office: 'asd',
  party: 'asd',
};
/**
* This is invalid office id
* @exports candidateData7
* */
export const candidateData7 = {
  office: 8,
  party,
};
/**
* This is invalid party id
* @exports candidateData8
* */
export const candidateData8 = {
  office,
  party: 8,
};
/**
* This is enrolling for same office again
* @exports candidateData9
* */
export const candidateData9 = {
  office,
  party,
};
