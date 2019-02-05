import validateCreateParty from './validateCreateParty';
import validateUpdateParty from './validateUpdateParty';
import validateOfficeInput from './validateOfficeInput';
import validateSignUp from './validateSignUp';
import validateUserLogin from './validateUserLogin';
import verifyToken from './verifyToken';
import verifyAdminToken from './verifyAdminToken';

const middlewares = {
  validateSignUp,
  validateUserLogin,
  validateCreateParty,
  validateUpdateParty,
  validateOfficeInput,
  verifyToken,
  verifyAdminToken,
};
export default middlewares;
