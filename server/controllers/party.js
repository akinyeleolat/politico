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
  static getParty(req,res){
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
  /**
 * @function createParty
 * @memberof PartyController
 * @static
 */
 static createParty(req, res){
    let { partyName, partyDetail,logoUrl } = req.body;
    partyName = partyName ? partyName.toString().replace(/\s+/g, '') : partyName;
    partyDetail = partyDetail ? partyDetail.toString().replace(/\s+/g, ' ') : partyDetail;
    logoUrl = logoUrl ? logoUrl.toString().replace(/\s+/g, '') : logoUrl;
    const newParty = {
      id: party.length + 1,
      partyName,
      partyDetail,
      logoUrl
    };
    party.push(newParty);
    return res.status(201).send({
      status: 201,
      newParty,
      message: 'Party Created',
    });
  };
  
}

export default PartyController;
