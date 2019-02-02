import { party, partyData } from '../models/party';

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
  static getParty(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct party parameter',
      });
      return;
    }
    const partyId = Number(id);
    const partyDetails = party.find(c => c.id === partyId);
    if (!partyDetails) {
      res.status(404).send({
        status: 404,
        error: 'The party with given id was not found',
      });
      return;
    }
    res.status(200).send({
      status: 200,
      data: partyDetails,
      message: 'Party\'s Details Retrieved',
    });
  }

  /**
 * @function createParty
 * @memberof PartyController
 * @static
 */
  static createParty(req, res) {
    let {
      partyName, partyDetail, hqAddress, logoUrl,
    } = req.body;

    partyName = partyName ? partyName.toString().replace(/\s+/g, '') : partyName;
    partyDetail = partyDetail ? partyDetail.toString().replace(/\s+/g, ' ') : partyDetail;
    hqAddress = hqAddress ? hqAddress.toString().replace(/\s+/g, ' ') : hqAddress;
    logoUrl = logoUrl ? logoUrl.toString().replace(/\s+/g, '') : logoUrl;
    const newParty = {
      id: party.length + 1,
      partyName,
      partyDetail,
      hqAddress,
      logoUrl,
    };
    party.push(newParty);
    return res.status(201).send({
      status: 201,
      data: newParty,
      message: 'Party Created',
    });
  }

  /**
 * @function updateParty
 * @memberof PartyController
 * @static
 */
  static updateParty(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct party parameter',
      });
      return;
    }
    const partyId = Number(id);
    let { partyName, partyDetail } = req.body;
    partyName = partyName ? partyName.toString().replace(/\s+/g, '') : partyName;
    partyDetail = partyDetail ? partyDetail.toString().replace(/\s+/g, ' ') : partyDetail;

    const partyDetails = party.find(c => c.id === partyId);
    if (!partyDetails) {
      res.status(404).send({
        status: 404,
        error: 'The party with given id was not found',
      });
      return;
    }
    const arrayIndex = partyId - 1;
    const newPartyDetail = {
      id: partyId,
      partyName,
      partyDetail,
    };
    party[arrayIndex] = newPartyDetail;
    res.status(200).send({
      status: 200,
      data: newPartyDetail,
      message: `party's name updated to ${partyName}`,
    });
  }

  /**
 * @function deleteParty
 * @memberof PartyController
 * @static
 */
  static deleteParty(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct party parameter',
      });
      return;
    }
    const partyId = Number(id);
    const partyDetails = party.find(c => c.id === partyId);
    if (!partyDetails) {
      res.status(404).send({
        status: 404,
        error: 'The party with given id was not found',
      });
      return;
    }
    const filteredParty = party.filter(parties => parties !== partyDetails);
    res.status(200).send({
      status: 200,
      message: `${partyDetails.partyName} deleted`,
    });
    partyData(filteredParty);
  }
}
export default PartyController;
