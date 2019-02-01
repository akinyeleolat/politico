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
   * @exports validateUpdateParty
   */
const validateUpdateParty = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'Party Name, Detail, logoUrl and Headquarter address is required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  if (req.body.partyName === undefined) next(validate.validationError(req, 'Party Name required'));
  if (req.body.partyDetail === undefined) next(validate.validationError(req, 'Party Detail required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let { partyName, partyDetail } = req.body;
  partyName = partyName && partyName.toString().trim();
  partyDetail = partyDetail && partyDetail.toString().trim();

  if (validate.checkEmpty(partyName)) next(validate.validationError(req, 'Party Name is required'));
  if (validate.checkEmpty(partyDetail)) next(validate.validationError(req, 'Party Detail is required'));
  if (!validate.checkString(partyName)) next(validate.validationError(req, 'Party Name  must be an alphabet'));
  if (!validate.checkString(partyDetail)) next(validate.validationError(req, 'Party detail must be an alphabet'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateUpdateParty;
