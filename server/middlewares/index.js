import validateCreateParty from './validateCreateParty';
import validateUpdateParty from './validateUpdateParty';
import validateOfficeInput from './validateOfficeInput';
import validateSignUp from './validateSignUp';
import validateUserLogin from './validateUserLogin';

const middlewares = {
  validateSignUp,
  validateUserLogin,
  validateCreateParty,
  validateUpdateParty,
  validateOfficeInput,
};
export default middlewares;
