import validateCreateParty from './validateCreateParty';
import validateUpdateParty from './validateUpdateParty';
import validateOfficeInput from './validateOfficeInput';

const middlewares = {
  validateCreateParty,
  validateUpdateParty,
  validateOfficeInput,
};
export default middlewares;
