import * as validate from './validate';

/**
   * This is a validation for office creation
   * @constant
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next next object
   *
   * @returns {Object} an object containing an error message if validation fails
   *
   * @exports validateOfficeInput
   */
const validateOfficeInput = (req, res, next) => {
  const typeOffice = ['federal', 'state', 'local government'];
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'Office name and office type required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let { officeName, officeType } = req.body;
  officeName = officeName && officeName.toString().trim();
  officeType = officeType && officeType.toString().trim();
  
  if (req.body.officeName === undefined) next(validate.validationError(req, 'Office Name required'));
  if (req.body.officeType === undefined) next(validate.validationError(req, 'Office type required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  if (validate.checkEmpty(officeName)) next(validate.validationError(req, 'Office Name is required'));
  if (validate.checkEmpty(officeType)) next(validate.validationError(req, 'Office type is required'));
  if (!validate.checkString(officeName)) next(validate.validationError(req, 'Office Name  must be an alphabet'));
  if (!validate.checkString(officeType)) next(validate.validationError(req, 'Office type must be an alphabet'));
  if (typeOffice.indexOf(officeType.toLowerCase()) < 0) next(validate.validationError(req, 'Enter valid office type'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateOfficeInput;
