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

    return db.query('SELECT * FROM office WHERE officeName = $1', [officeName])
      .then((result) => {
        if (result.rows[0]) {
          return res.status(409).json({
            status: 409,
            error: 'office with this name already exist',
          });
        }
        return db.query('INSERT INTO office (officeName, officeType) VAlUES($1,$2) RETURNING *', [officeName, officeType])
          .then((office) => {
            const officeProfile = {
              id: office.rows[0].id,
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
      });
  }

  /**
 * @function getAllOffice
 * @memberof OfficeController
 * @static
 */
  static getAllOffice(req, res) {
    return db.query('SELECT * FROM OFFICE')
      .then((office) => {
        const data = office.rows;
        return res.status(200).send({
          status: 200,
          data,
          message: 'Retrieved all office',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch office',
          err: err.message,
        });
      });
  }

  /**
 * @function getOffice
 * @memberof OfficeController
 * @static
 */
  static getOffice(req, res) {
    let { id } = req.params;
    id = Number(id);
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct office parameter',
      });
      return;
    }
    db.query('SELECT * FROM OFFICE WHERE ID=$1', [id])
      .then((office) => {
        if (!office.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The office with given id was not found',
          });
          return;
        }
        const data = office.rows[0];
        res.status(200).send({
          status: 200,
          data,
          message: 'Office\'s Details Retrieved',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch office',
          err: err.message,
        });
      });
  }
}
export default OfficeController;
