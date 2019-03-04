import * as validate from './validate';

/**
   * This is a validation for candidate Approval
   * @constant
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next next object
   *
   * @returns {Object} an object containing an error message if validation fails
   *
   * @exports validateCandidateApproval
   */
const validateCandidateApproval = (req, res, next) => {
  const approvalType = ['approved','pending', 'rejected'];
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) next(validate.validationError(req, 'approve status required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  let { approveStatus } = req.body;
  approveStatus = approveStatus && approveStatus.toString().trim();
  
  
  if (req.body.approveStatus === undefined) next(validate.validationError(req, 'Approve Status required'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  if (validate.checkEmpty(approveStatus)) next(validate.validationError(req, 'Approvel status cannot be empty'));
  if (!validate.checkString(approveStatus)) next(validate.validationError(req, 'approve Status  must be an alphabet'));
  if (approvalType.indexOf(approveStatus.toLowerCase()) < 0) next(validate.validationError(req, 'Approval Status can either be approved, pending or rejected'));
  if (req.error) return next(validate.getErrorMsg(req, res));
  return next();
};
export default validateCandidateApproval;
