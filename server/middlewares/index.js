import validateCreateParty from './validateCreateParty';
import validateUpdateParty from './validateUpdateParty';
import validateOfficeInput from './validateOfficeInput';
import validateSignUp from './validateSignUp';

const middlewares = {
  validateSignUp,
  validateCreateParty,
  validateUpdateParty,
  validateOfficeInput,
};
export default middlewares;
