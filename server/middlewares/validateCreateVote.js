import * as validate from './validate';

/**
   * This is a validation for voters
   * @constant
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next next object
   *
   * @returns {Object} an object containing an error message if validation fails
   *
   * @exports validateCreateVote
   */
const validateCreateVote = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'Office and candidate required'));
  if (req.error) return next(validate.getErrorMsg(req, res));

  if (req.body.office === undefined) next(validate.validationError(req, 'office required'));
  if (req.body.candidate === undefined) next(validate.validationError(req, 'candidate required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let {
    office, candidate,
  } = req.body;
  office = office && office.toString().trim();
  candidate = candidate && candidate.toString().trim();


  if (validate.checkEmpty(office)) next(validate.validationError(req, 'Office is required'));
  if (validate.checkEmpty(candidate)) next(validate.validationError(req, 'Candidate is required'));
  if (!validate.checkNumber(office)) next(validate.validationError(req, 'office id  must be a number'));
  if (!validate.checkNumber(candidate)) next(validate.validationError(req, 'candidate id must be a number'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateCreateVote;
