import db from '../db';

/** party controller class */

class PartyController {
 
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

    return db.task('createParty', db => db.party.findByName(partyName)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            status: 409,
            error: 'party with this name already exist',
          });
        }
        return db.party.findByDetail(partyDetail)
          .then((found) => {
            if (found) {
              return res.status(409).json({
                status: 409,
                error: 'party with this detail already exist',
              });
            }
            return db.party.create({partyName, partyDetail, hqAddress, logoUrl })
              .then((party) => {
                const partyProfile = {
                  id: party.id,
                  partyName,
                  partyDetail,
                  hqAddress,
                  logoUrl,
                };
                const data = [
                  {
                    party: partyProfile,
                  },
                ];
                return res.status(201).json({
                  status: 201,
                  data,
                  message: 'Party created',
                });
              });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to create party',
          err: err.message,
        });
      }))
  }

}
export default PartyController;
