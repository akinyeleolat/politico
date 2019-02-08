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

    db.query('SELECT * FROM party WHERE partyName = $1', [partyName])
      .then((result) => {
        if (result.rows[0]) {
          return res.status(409).json({
            status: 409,
            error: 'party with this name already exist',
          });
        }
        db.query('SELECT * FROM party WHERE partyDetail = $1',[partyDetail])
          .then((found) => {
            if (found.rows[0]) {
              return res.status(409).json({
                status: 409,
                error: 'party with this detail already exist',
              });
            }
            db.query('INSERT INTO party (partyName, partyDetail, hqAddress, logoUrl) VAlUES($1,$2,$3,$4) RETURNING *', [partyName, partyDetail, hqAddress, logoUrl])
              .then((party) => {
                const partyId = party.rows[0].id;
                const partyProfile = {
                  id: partyId,
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
      });
  }

  /**
 * @function getAllParty
 * @memberof PartyController
 * @static
 */
  static getAllParty(req, res) {
    db.query('SELECT * FROM PARTY')
      .then((party) => {
        const data = party.rows;
        return res.status(200).send({
          status: 200,
          data,
          message: 'Retrieved all Parties',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch party',
          err: err.message,
        });
      });
  }

  /**
 * @function getParty
 * @memberof PartyController
 * @static
 */
  static getParty(req, res) {
    let { id } = req.params;
    id = Number(id);
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct party parameter',
      });
      return;
    }
    db.query('SELECT * FROM PARTY WHERE ID=$1', [id])
      .then((party) => {
        if (!party.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The party with given id was not found',
          });
          return;
        }
        const data = party.rows[0];
        res.status(200).send({
          status: 200,
          data,
          message: 'Party\'s Details Retrieved',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch party',
          err: err.message,
        });
      });
  }

  /**
   * @function updateParty
   * @memberof PartyController
   * @static
   */
  static updateParty(req, res) {
    const { id } = req.params;
    if (!(/^[\d]+$/.test(id))) {
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
    return db.query('SELECT * FROM PARTY WHERE ID=$1', [id])
      .then((party) => {
        if (!party.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The party with given id was not found',
          });
          return;
        }
        db.query('UPDATE party SET partyName = $1, partyDetail=$2 WHERE id=$3 RETURNING *', [partyName, partyDetail, partyId])
          .then((party) => {
            const data = party.rows[0];
            return res.status(200).send({
              status: 200,
              data,
              message: `party's name updated to ${partyName}`,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to update party name',
              err: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch party',
          err: err.message,
        });
      });
  }

  /**
   * @function deleteParty
   * @memberof PartyController
   * @static
   */
  static deleteParty(req, res) {
    const { id } = req.params;
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct party parameter',
      });
      return;
    }
    const partyId = Number(id);
    return db.query('SELECT * FROM PARTY WHERE ID=$1', [id])
      .then((party) => {
        if (!party.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The party with given id was not found',
          });
          return;
        }
        db.query('DELETE FROM party WHERE id = $1 RETURNING *', [partyId])
          .then((party) => {
            return res.status(200).send({
              status: 200,
              message: `${party.rows[0].partyname} deleted`,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to delete party',
              err: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch party',
          err: err.message,
        });
      });
  }
}
export default PartyController;
