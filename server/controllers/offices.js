import db from '../db';

/** office controller class */

class OfficeController {
 
  
  /**
 * @function createOffice
 * @memberof OfficeController
 * @static
 */
  static createOffice(req, res) {
    let { officeName, officeType } = req.body;
    officeName = officeName ? officeName.toString().replace(/\s+/g, ' ') : officeName;
    officeType = officeType ? officeType.toString().toLowerCase().replace(/\s+/g, '') : officeType;

    return db.task('createOffice', db => db.office.findByName(officeName)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            status: 409,
            error: 'office with this name already exist',
          });
        }
        return db.office.create({officeName, officeType })
          .then((office) => {
            const officeProfile = {
              id: office.id,
              officeName,
              officeType,
            };
            const data = [
              {
                office: officeProfile,
              },
            ];
            return res.status(201).json({
              status: 201,
              data,
              message: 'office created',
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to create office',
          err: err.message,
        });
      }));
  }
  
  /**
 * @function getAllOffice
 * @memberof OfficeController
 * @static
 */
  static getAllOffice(req, res) {
    return db.task('AllOffice', db => db.office.allData()
      .then((office) => {
        const data = office;
        return res.status(200).send({
          status: 200,
          data,
          message: 'Retrieved all Parties',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch office',
          err: err.message,
        });
      }));
  }
}
export default OfficeController;
