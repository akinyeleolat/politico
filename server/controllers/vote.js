import db from '../db';

/** user controller class */
class VoteController {
/**
 * @function createVote
 * @memberof VoteController
 * @static
 */
  static createVote(req, res) {
    const voter = req.userId;
    console.log(req.userId);
    let { office, candidate } = req.body;
    office = office ? office.toString().trim() : office;
    candidate = candidate ? candidate.toString().trim() : candidate;
    office = Number(office);
    candidate = Number(candidate);

    db.query('SELECT office FROM VOTE WHERE createdBy=$1 AND office=$2', [voter, office])
      .then((voteData) => {
        if (voteData.rows[0]) {
          return res.status(409).send({
            status: 409,
            error: 'The voter with given id has voted a candidate for this office',
          });
        }
        db.query('SELECT * FROM users WHERE id=$1', [candidate])
          .then((userData) => {
            if (!userData.rows[0]) {
              return res.status(404).send({
                status: 404,
                error: 'The candidate with given id does not exist',
              });
            }
            db.query('SELECT * FROM office WHERE id=$1', [office])
              .then((officeData) => {
                if (!officeData.rows[0]) {
                  return res.status(404).send({
                    status: 404,
                    error: 'The office does not exist',
                  });
                }
                db.query('SELECT * FROM CANDIDATES WHERE candidate=$1', [candidate])
                  .then((candidateData) => {
                    if (!candidateData.rows[0]) {
                      return res.status(404).send({
                        status: 404,
                        error: 'The candidate has not been enrolled for an office',
                      });
                    }
                    db.query('INSERT INTO vote (createdBy, office, candidate) VALUES ($1,$2,$3) RETURNING *', [voter, office, candidate])
                      .then((voteValue) => {
                        const data = voteValue.rows[0];
                        return res.status(200).send({
                          status: 201,
                          data,
                          message: 'Vote cast',
                        });
                      })
                      .catch((err) => {
                        return res.status(500).json({
                          status: 500,
                          error: 'unable to create vote',
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
          error: 'unable to fetch voter',
          err: err.message,
        });
      });
  }
}
export default VoteController;
