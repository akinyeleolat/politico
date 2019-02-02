import * as validate from './validate';

/**
   * This is a validation for party creation
   * @constant
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next next object
   *
   * @returns {Object} an object containing an error message if validation fails
   *
   * @exports validateCreateParty
   */
const validateCreateParty = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'Party Name, Detail, logoUrl and Headquarter address is required'));
  if (req.error) return next(validate.getErrorMsg(req, res));

  if (req.body.partyName === undefined) next(validate.validationError(req, 'Party Name required'));
  if (req.body.partyDetail === undefined) next(validate.validationError(req, 'Party Detail required'));
  if (req.body.hqAddress === undefined) next(validate.validationError(req, 'Headquarter Address required'));
  if (req.body.logoUrl === undefined) next(validate.validationError(req, 'logo url required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let {
    partyName, partyDetail, hqAddress, logoUrl,
  } = req.body;
  partyName = partyName && partyName.toString().trim();
  partyDetail = partyDetail && partyDetail.toString().trim();
  hqAddress = hqAddress && hqAddress.toString().trim();
  logoUrl = logoUrl && logoUrl.toString().trim();


  if (validate.checkEmpty(partyName)) next(validate.validationError(req, 'Party Name is required'));
  if (validate.checkEmpty(partyDetail)) next(validate.validationError(req, 'Party Detail is required'));
  if (validate.checkEmpty(hqAddress)) next(validate.validationError(req, 'Headquarter Address is required'));
  if (!validate.checkString(partyName)) next(validate.validationError(req, 'Party Name  must be an alphabet'));
  if (!validate.checkString(partyDetail)) next(validate.validationError(req, 'Party detail must be an alphabet'));
  if (validate.checkEmpty(logoUrl)) next(validate.validationError(req, 'Kindly upload the logo'));
  if (!validate.checkUrl(logoUrl)) next(validate.validationError(req, 'Url of the logo not valid'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateCreateParty;
