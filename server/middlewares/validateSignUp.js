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
   * @exports validateSignUp
   */
const validateSignUp = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'firstname, lastname,email, phonenumber are required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  if (req.body.firstname === undefined) next(validate.validationError(req, 'First Name required'));
  if (req.body.lastname === undefined) next(validate.validationError(req, 'Last Name required'));
  if (req.body.email === undefined) next(validate.validationError(req, 'email required'));
  if (req.body.phonenumber === undefined) next(validate.validationError(req, 'Phone Number required'));
  if (req.body.password === undefined) next(validate.validationError(req, 'Password required'));
  if (req.body.passporturl === undefined) next(validate.validationError(req, 'Passport required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let {
    firstname, lastname, othername, email, phonenumber, passporturl, password,
  } = req.body;
  firstname = firstname && firstname.toString().trim();
  lastname = lastname && lastname.toString().trim();
  othername = othername && othername.toString();
  email = email && email.toString().trim();
  phonenumber = phonenumber && phonenumber.toString().trim().replace(/\s+/g, '');
  password = password && password.toString().trim();
  passporturl = passporturl && passporturl.toString().trim();
  if (validate.checkEmpty(firstname)) next(validate.validationError(req, 'First Name is required'));
  if (validate.checkEmpty(lastname)) next(validate.validationError(req, 'Last Name is required'));
  if (validate.checkEmpty(email)) next(validate.validationError(req, 'Email is required'));
  if (validate.checkEmpty(phonenumber)) next(validate.validationError(req, 'Phone Number is required'));
  if (validate.checkEmpty(passporturl)) next(validate.validationError(req, 'Kindly upload passport'));
  if (validate.checkEmpty(password)) next(validate.validationError(req, 'Kindly enter password'));
  if (!validate.checkString(firstname)) next(validate.validationError(req, 'First Name  must be an alphabet'));
  if (!validate.checkString(lastname)) next(validate.validationError(req, 'Last Name must be an alphabet'));
  if (!validate.checkString(othername)) next(validate.validationError(req, 'Other Name  must be an alphabet'));
  if (!validate.checkEmail(email)) next(validate.validationError(req, 'Enter valid Email'));
  if (!validate.checkUrl(passporturl)) next(validate.validationError(req, 'Invalid passport Url'));
  if (!validate.checkLengthMin(password, 6)) next(validate.validationError(req, 'Password cannot be less than 6 characters'));
  if (!validate.checkPhoneNumber(phonenumber)) next(validate.validationError(req, 'Enter valid phone number'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateSignUp;
