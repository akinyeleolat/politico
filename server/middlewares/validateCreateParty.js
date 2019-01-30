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
  let { partyName, partyDetail, logoUrl } = req.body;
  partyName = partyName && partyName.toString().trim();
  partyDetail = partyDetail && partyDetail.toString().trim();
  logoUrl = logoUrl && logoUrl.toString().trim();

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(validate.validationError(res, 'Blank party details'));
  if (validate.checkEmpty(partyName)) return next(validate.validationError(res, 'Party Name is required'));
  if (validate.checkEmpty(partyDetail)) return next(validate.validationError(res, 'Party Detail is required'));
  if (!validate.checkString(partyName)) return next(validate.validationError(res, 'Party Name  must be an alphabet'));
  if (!validate.checkString(partyDetail)) return next(validate.validationError(res, 'Party detail must be an alphabet'));
  if (validate.checkEmpty(logoUrl)) return next(validate.validationError(res, 'Kindly upload the logo'));
  if (!validate.checkUrl(logoUrl)) return next(validate.validationError(res, 'Url of the logo not valid'));
  return next();
};
export default validateCreateParty;
