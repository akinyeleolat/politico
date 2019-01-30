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
  let { officeName, officeType } = req.body;
  officeName = officeName && officeName.toString().trim();
  officeType = officeType && officeType.toString().trim();
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(validate.validationError(res, 'Blank office details'));
  if (validate.checkEmpty(officeName)) return next(validate.validationError(res, 'Office Name is required'));
  if (validate.checkEmpty(officeType)) return next(validate.validationError(res, 'Office type is required'));
  if (!validate.checkString(officeName)) return next(validate.validationError(res, 'Office Name  must be an alphabet'));
  if (!validate.checkString(officeType)) return next(validate.validationError(res, 'Office type must be an alphabet'));
  if (typeOffice.indexOf(officeType.toLowerCase()) < 0) return next(validate.validationError(res, 'Enter valid office type'));
  return next();
};
export default validateOfficeInput;
