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
}

export default PartyController;
