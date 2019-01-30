const officeName = 'Presidency';
const officeType = 'federal';
const officeType1 = 'state';
const officeType2 = 'local government';

/**
* This is a valid office data
* @exports officeData1
* */
export const officeData1 = {
  officeName,
  officeType,
};
/**
* This is a valid office type state
* @exports officeData1b
* */
export const officeData1b = {
    officeName,
    officeType: officeType1,
  };
  /**
* This is a valid office type LG
* @exports officeData1c
* */
export const officeData1c = {
    officeName,
    officeType: officeType2,
  };
/**
* This is empty office Name
* @exports officeData2
* */
export const officeData2 = {
  officeName: '',
  officeType,
};
/**
* This is office Name with space
* @exports officeData3
* */
export const officeData3 = {
  officeName: ' ',
  officeType,
};
/**
* This is empty office type
* @exports officeData4
* */
export const officeData4 = {
  officeName,
  officeType: '',
};
/**
* This is office type with space
* @exports officeData5
* */
export const officeData5 = {
  officeName,
  officeType: ' ',
};

/**
* This is office name and type  that is number
* @exports officeData6
* */
export const officeData6 = {
  officeName: 123,
  officeType: 123,
};
/**
* This is invalid office type
* @exports officeData7
* */
export const officeData7 = {
  officeName,
  officeType: 'constituency',
};
