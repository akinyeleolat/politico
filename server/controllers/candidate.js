import db from '../db';

/** user controller class */
class CandidateController {
/**
 * @function enrollCandidate
 * @memberof CandidateController
 * @static
 */
  static enrollCandidate(req, res) {
    const { id } = req.params;
    const candidate = Number(id);
    if (!(/^[\d]+$/.test(candidate))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct user parameter',
      });
      return;
    }
    let { office, party } = req.body;
    office = office ? office.toString().trim() : office;
    party = party ? party.toString().trim() : party;
    party = Number(party);
    office = Number(office);

    db.query('SELECT office FROM CANDIDATES WHERE candidate=$1 AND office=$2', [candidate, office])
      .then((candidatesData) => {
        if (candidatesData.rows[0]) {
          return res.status(400).send({
            status: 400,
            error: 'The candidate with given id has been enroll for this office',
          });
        }
        db.query('SELECT * FROM users WHERE id=$1', [candidate])
          .then((userData) => {
            if (!userData.rows[0]) {
              return res.status(400).send({
                status: 400,
                error: 'The candidate with given id does not exist',
              });
            }
            db.query('SELECT * FROM office WHERE id=$1', [office])
              .then((officeData) => {
                if (!officeData.rows[0]) {
                  return res.status(400).send({
                    status: 400,
                    error: 'The office does not exist',
                  });
                }
                db.query('SELECT * FROM party WHERE id=$1', [party])
                  .then((partyData) => {
                    if (!partyData.rows[0]) {
                      return res.status(400).send({
                        status: 400,
                        error: 'The party does not exist',
                      });
                    }
                    db.query('INSERT INTO candidates (office, party, candidate) VALUES ($1,$2,$3) RETURNING *', [office, party, candidate])
                      .then((userValue) => {
                        const data = userValue.rows[0];
                        return res.status(201).send({
                          status: 201,
                          data,
                          message: 'Candidate enroll',
                        });
                      })
                      .catch((err) => {
                        return res.status(500).json({
                          status: 500,
                          error: 'unable to enroll candidate',
                          err: err.message,
                        });
                      });
                  });
              });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch candidate',
          err: err.message,
        });
      });
  }

  /**
 * @function viewCandidate running for an office
 * @memberof CandidateController
 * @static
 */
  static viewCandidate(req, res) {
    const { id } = req.params;
    const office = Number(id);
    if (!(/^[\d]+$/.test(office))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct user parameter',
      });
      return;
    }
    db.query('SELECT * FROM office WHERE id=$1', [office])
      .then((officeData) => {
        if (!officeData.rows[0]) {
          return res.status(400).send({
            status: 400,
            error: 'The office does not exist',
          });
        }
        let officeName = officeData.rows[0].officename;
        console.log(officeName);
        db.query('SELECT candidate,USERS.FIRSTNAME, USERS.LASTNAME, USERS.EMAIL,party.partyname, candidates.created_at FROM CANDIDATES INNER JOIN USERS ON CANDIDATE=USERS.ID inner join party on party=party.id WHERE office=$1', [office])
          .then((candidatesData) => {
            if (!candidatesData.rows[0]) {
              return res.status(400).send({
                status: 400,
                error: 'Candidate has not been enrolled for this office',
              });
            }
            return res.status(200).send({
              status: 200,
              data: candidatesData.rows,
              message: `Candidate Retrieved for  ${officeName}`,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to fetch candidate',
              err: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch candidate',
          err: err.message,
        });
      });
  }
}
export default CandidateController;