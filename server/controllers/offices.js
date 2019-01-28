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
      message: 'Offices Retrived',
    });
  }
/**
 * @function getOffice
 * @memberof OfficeController
 * @static
 */
static getOffice(req,res){
    let { id } = req.params;
    if(isNaN(id)){
        res.status(404).send({
            status: 404,
            message:'Enter the correct party parameter'
        })
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
      message: `Party's Details Retrieved`,
    });
  };
  
}

export default OfficeController;
