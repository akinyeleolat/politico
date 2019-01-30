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
   * @exports validateUpdateParty
   */
  const validateUpdateParty = (req,res,next) => {
    let { partyName, partyDetail,logoUrl } = req.body;
    partyName = partyName && partyName.toString().trim();
    partyDetail = partyDetail && partyDetail.toString().trim();

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) return next(validate.validationError(res,'Blank party details'));
    if(validate.checkEmpty(partyName)) return next(validate.validationError(res,'Party Name is required'));
    if(validate.checkEmpty(partyDetail)) return next(validate.validationError(res,'Party Detail is required'));
  return next();
  };
  export default validateUpdateParty;