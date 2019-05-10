import validateCreateParty from './validateCreateParty';
import validateUpdateParty from './validateUpdateParty';
import validateOfficeInput from './validateOfficeInput';
import validateSignUp from './validateSignUp';
import validateUserLogin from './validateUserLogin';
import validateCreateCandidate from './validateCreateCandidate';
import validateCandidateApproval from './validateCandidateApproval';
import validateCreateVote from './validateCreateVote';
import verifyToken from './verifyToken';
import verifyAdminToken from './verifyAdminToken';

const middlewares = {
  validateSignUp,
  validateUserLogin,
  validateCreateParty,
  validateUpdateParty,
  validateOfficeInput,
  validateCreateCandidate,
  validateCandidateApproval,
  validateCreateVote,
  verifyToken,
  verifyAdminToken,
};
export default middlewares;
