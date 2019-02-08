import * as validate from './validate';

/**
   * This is a validation for candidate enrolling for an office
   * @constant
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next next object
   *
   * @returns {Object} an object containing an error message if validation fails
   *
   * @exports validateCreateCandidate
   */
const validateCreateCandidate = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'Office and party required'));
  if (req.error) return next(validate.getErrorMsg(req, res));

  if (req.body.office === undefined) next(validate.validationError(req, 'office required'));
  if (req.body.party === undefined) next(validate.validationError(req, 'Party required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let {
    office, party,
  } = req.body;
  office = office && office.toString().trim();
  party = party && party.toString().trim();


  if (validate.checkEmpty(office)) next(validate.validationError(req, 'Office is required'));
  if (validate.checkEmpty(party)) next(validate.validationError(req, 'Party is required'));
  if (!validate.checkNumber(office)) next(validate.validationError(req, 'office id  must be a number'));
  if (!validate.checkNumber(party)) next(validate.validationError(req, 'Party id must be a number'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateCreateCandidate;
