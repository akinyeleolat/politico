import { offices } from '../models/offices';

/** office controller class */

class OfficeController {

  /**
 * @function getAllOffices
 * @memberof OfficeController
 * @static
 */
  static getAllOffice(req, res) {
    const data = offices;
    return res.status(200).send({
      status: 200,
      data,
      message: 'Offices Retrieved',
    });
  }

  /**
 * @function getOffice
 * @memberof OfficeController
 * @static
 */
  static getOffice(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct office parameter',
      });
      return;
    }
    const officeId = Number(id);
    const officeDetails = offices.find(c => c.id === officeId);
    if (!officeDetails) {
      res.status(404).send({
        status: 404,
        error: 'The office with given id was not found',
      });
      return;
    }
    res.status(200).send({
      status: 200,
      data: officeDetails,
      message: 'Office\'s Details Retrieved',
    });
  }

  /**
 * @function createOffice
 * @memberof OfficeController
 * @static
 */
  static createOffice(req, res) {
    let { officeName, officeType } = req.body;
    officeName = officeName ? officeName.toString().replace(/\s+/g, ' ') : officeName;
    officeType = officeType ? officeType.toString().toLowerCase().replace(/\s+/g, '') : officeType;
    const newOffice = {
      id: offices.length + 1,
      officeName,
      officeType,
    };
    offices.push(newOffice);
    res.status(201).send({
      status: 201,
      data: newOffice,
      message: 'Office Created',
    });
  }
}

export default OfficeController;
