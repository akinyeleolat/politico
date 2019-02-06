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
   * @exports validateLogin
   */
const validateUserLogin = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'email and password are required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  if (req.body.email === undefined) next(validate.validationError(req, 'email required'));
  if (req.body.password === undefined) next(validate.validationError(req, 'Password required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let {
    email, password,
  } = req.body;
  email = email && email.toString().trim();
  password = password && password.toString().trim();
  if (validate.checkEmpty(email)) next(validate.validationError(req, 'Email is required'));
  if (validate.checkEmpty(password)) next(validate.validationError(req, 'Kindly enter password'));
  if (!validate.checkEmail(email)) next(validate.validationError(req, 'Enter valid Email'));
  if (!validate.checkLengthMin(password, 6)) next(validate.validationError(req, 'Password cannot be less than 6 characters'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateUserLogin;
