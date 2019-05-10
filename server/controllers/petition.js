import db from '../db';

/** petition controller class */

class PetitionController {
  /**
 * @function createPetition
 * @memberof PetitionController
 * @static
 */
  static createPetiton(req, res) {
    let {
      office, petition, evidence,
    } = req.body;
    const { userId } = req.UserId;
    const createdBy = userId;
    office = office ? office.toString().replace(/\s+/g, '') : office;
    petition = petition ? petition.toString().replace(/\s+/g, ' ') : petition;
    evidence = evidence ? evidence.toString().replace(/\s+/g, ' ') : evidence;
    db.query('SELECT * FROM candidates WHERE candidate = $1', [createdBy])
      .then((result) => {
        if (!result.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'Only politician can write election petition',
          });
        }
        db.query('SELECT * FROM vote WHERE office = $1', [office])
          .then((found) => {
            if (!found.rows[0]) {
              return res.status(400).json({
                status: 400,
                error: 'No election has been conducted for this office',
              });
            }
            db.query('SELECT * FROM petitions WHERE createdBy = $1 AND office = $2', [createdBy, office])
              .then((petitions) => {
                if (petitions.rows[0]) {
                  return res.status(400).json({
                    status: 400,
                    error: 'You have submitted petition for this office before',
                  });
                }
                db.query('INSERT INTO petitions ( createdBy, office, petition, evidence ) VAlUES($1,$2,$3,$4) RETURNING *', [createdBy, office, petition, evidence ])
                  .then((petitionData) => {
                    const petitionId = petitionData.rows[0].id;
                    const petitionProfile = {
                      id: petitionId,
                      createdBy,
                      office,
                      petition,
                      evidence,
                    };
                    const data = {
                      petition: petitionProfile,
                    };
                    return res.status(201).json({
                      status: 201,
                      data,
                      message: 'Petition created',
                    });
                  });
              });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to create petition',
          err: err.message,
        });
      });
  }

  /**
 * @function getAllPetition Get all petitions submitted
 * @memberof PetitionController
 * @static
 */
  static getAllPetition(req, res) {
    db.query('SELECT USERS.LASTNAME, USERS.FIRSTNAME AS NAME, OFFICE.OFFICENAME, PETITION, EVIDENCE FROM PETITIONS INNER JOIN USERS ON CREATEDBY=USERS.ID INNER JOIN OFFICE ON OFFICE=OFFICE.ID')
      .then((petition) => {
        const data = petition.rows;
        return res.status(200).send({
          status: 200,
          data,
          message: 'Retrieved all Parties',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch petitions',
          err: err.message,
        });
      });
  }

  /**
 * @function getPetition Get specific petition details
 * @memberof PetitionController
 * @static
 */
  static getPetition(req, res) {
    let { id } = req.params;
    id = Number(id);
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct petition parameter',
      });
      return;
    }
    db.query('SELECT USERS.LASTNAME, USERS.FIRSTNAME AS NAME, OFFICE.OFFICENAME, PETITION, EVIDENCE FROM PETITIONS INNER JOIN USERS ON CREATEDBY=USERS.ID INNER JOIN OFFICE ON OFFICE=OFFICE.ID WHERE ID=$1', [id])
      .then((petition) => {
        if (!petition.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The petition with given id was not found',
          });
          return;
        }
        const data = petition.rows[0];
        res.status(200).send({
          status: 200,
          data,
          message: 'Petition\'s Details Retrieved',
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch petition',
          err: err.message,
        });
      });
  }

  /**
   * @function updatePetition
   * @memberof PetitionController
   * @static
   */
  static updatePetition(req, res) {
    const { id } = req.params;
    const { userId } = req.UserId;
    const createdBy = userId;
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct petition parameter',
      });
      return;
    }
    const petitionId = Number(id);
    let {
      office, petition, evidence, 
    } = req.body;
    office = office ? office.toString().replace(/\s+/g, '') : office;
    petition = petition ? petition.toString().replace(/\s+/g, ' ') : petition;
    evidence = evidence ? evidence.toString().replace(/\s+/g, ' ') : evidence;

    db.query('SELECT * FROM PETITIONS WHERE ID=$1', [petitionId])
      .then((petitionData) => {
        if (!petitionData.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The petition with given id was not found',
          });
          return;
        }
        db.query('SELECT * FROM PETITIONS WHERE  CREATEDBY=$1 AND ID=$2', [createdBy, petitionId])
          .then((userData) => {
            if (!userData.rows[0]) {
              res.status(400).send({
                status: 400,
                error: 'Only the petitioner can edit this petition',
              });
              return;
            }
            db.query('UPDATE petitions SET office = $1, petition=$2, evidence=$3 WHERE id=$4 AND createdby=$5 RETURNING *', [office, petition, evidence, petitionId, userId])
              .then((newPetition) => {
                const data = newPetition.rows[0];
                return res.status(200).send({
                  status: 200,
                  data,
                  message: `petitions with id ${petitionId} updated`,
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  status: 500,
                  error: 'unable to update petition',
                  err: err.message,
                });
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
   * @function deletePetition delete petitions
   * @memberof PetitionController
   * @static
   */
  static deletePetition(req, res) {
    const { id } = req.params;
    if (!(/^[\d]+$/.test(id))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct petition parameter',
      });
      return;
    }
    const petitionId = Number(id);
    db.query('SELECT * FROM petitions WHERE ID=$1', [petitionId])
      .then((petition) => {
        if (!petition.rows[0]) {
          res.status(404).send({
            status: 404,
            error: 'The petition with given id was not found',
          });
          return;
        }
        db.query('DELETE FROM petitions WHERE id = $1 RETURNING *', [petitionId])
          .then((petitionData) => {
            return res.status(200).send({
              status: 200,
              message: `${petitionData.rows[0].petition} deleted`,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to delete petition',
              err: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch petition',
          err: err.message,
        });
      });
  }
}
export default PetitionController;
