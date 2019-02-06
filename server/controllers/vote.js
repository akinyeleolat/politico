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
    let { office, candidate } = req.body;
    office = office ? office.toString().trim() : office;
    candidate = candidate ? candidate.toString().trim() : candidate;
    office = Number(office);
    candidate = Number(candidate);

    db.query('SELECT office FROM VOTE WHERE createdBy=$1 AND office=$2', [voter, office])
      .then((voteData) => {
        if (voteData.rows[0]) {
          return res.status(400).send({
            status: 400,
            error: 'The voter with given id has voted a candidate for this office',
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
                db.query('SELECT office FROM CANDIDATES WHERE candidate=$1 AND office=$2', [candidate, office])
                  .then((candidateData) => {
                    if (!candidateData.rows[0]) {
                      return res.status(400).send({
                        status: 400,
                        error: 'The candidate has not been enrolled for this office',
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

  /**
 * @function getVoteResult
 * @memberof VoteController
 * @static
 */
  static getVoteResult(req, res) {
    const { id } = req.params;
    const office = Number(id);
    if (!(/^[\d]+$/.test(office))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct office parameter',
      });
      return;
    }
    db.query('SELECT * FROM VOTE WHERE OFFICE=$1', [office])
      .then((officeList) => {
        if (!officeList.rows[0]) {
          res.status(400).send({
            status: 400,
            error: 'The office with this id has not vote result',
          });
          return;
        }
        db.query(`
        SELECT
          office,
          candidate,
          COUNT(createdBy) as RESULT 
      FROM
          vote 
      WHERE
          office=$1 
      GROUP BY
          candidate,
          office
          
      ORDER BY
          RESULT DESC`, [office])
          .then((result) => {
            return res.status(200).send({
              status: 200,
              data: result.rows,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to fetch result',
              err: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 500,
          error: 'unable to fetch vote List',
          err: err.message,
        });
      });
  }
}
export default VoteController;
