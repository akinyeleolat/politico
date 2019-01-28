import { offices, officesData } from '../models/offices';

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
      message: 'Offices Retrived',
    });
  }

  
}

export default OfficeController;
