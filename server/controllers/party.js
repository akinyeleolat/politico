import party from '../models/party';

/** party controller class */

class PartyController {
  /**
 * @function getAllParty
 * @memberof PartyController
 * @static
 */
  static getAllParty(req, res) {
    const data = party;
    return res.status(200).send({
      status: 200,
      data,
      message: 'Retrieved all Parties',
    });
  }

  /**
 * @function getParty
 * @memberof PartyController
 * @static
 */
  static getParty (req,res){
    let { id } = req.params;
    if(isNaN(id)){
        res.status(404).send({
            status: 404,
            message:'Enter the correct party parameter'
        })
        return;
    } 
    const partyId = Number(id);
    const partyDetails = party.find(c => c.id === partyId);
    if (!partyDetails) {
      res.status(404).send({
        status: 404,
        message: 'The party with given id was not found',
      });
      return;
    }
    res.status(200).send({
      status: 200,
      data: partyDetails,
      message: `Party's Details Retrieved`,
    });
  };
}

export default PartyController;
