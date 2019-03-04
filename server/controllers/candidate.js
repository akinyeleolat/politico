import db from '../db';

/** candidate controller class */
class CandidateController {
/**
 * @function enrollCandidate
 * @memberof CandidateController
 * @static
 */
  static enrollCandidate(req, res) {
    const candidate = req.userId;
    const approveStatus = process.env.APPROVE_DEFAULT;
    
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
        db.query('SELECT office FROM CANDIDATES WHERE candidate=$1', [candidate])
      .then((candidatesData) => {
        if (candidatesData.rows[0]) {
          return res.status(400).send({
            status: 400,
            error: 'The candidate with given id has been enroll for an office',
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
                db.query('SELECT * FROM party WHERE id=$1', [party])
                  .then((partyData) => {
                    if (!partyData.rows[0]) {
                      return res.status(404).send({
                        status: 404,
                        error: 'The party does not exist',
                      });
                    }
                    db.query('INSERT INTO candidates (office, party, candidate, approve_status) VALUES ($1,$2,$3,$4) RETURNING *', [office, party, candidate, approveStatus])
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
 * @function approveCandidate this function approve or reject candidate expression for office
 * @memberof CandidateController
 * @static
 */
static approveCandidate(req, res) {
  const { candidateId } = req.params;
  const { officeId } = req.params;
  const candidate = Number(candidateId);
  const office = Number(officeId);
  let { approveStatus } = req.body;
  approveStatus = approveStatus && approveStatus.toString().replace(/\s+/g, '');
  if (!(/^[\d]+$/.test(candidate))) {
    res.status(400).send({
      status: 400,
      error: 'Enter the correct candidate parameter',
    });
    return;
  }
  if (!(/^[\d]+$/.test(office))) {
    res.status(400).send({
      status: 400,
      error: 'Enter the correct office parameter',
    });
    return;
  }
  let candidateStatus;
  if(approveStatus =='approved'){
    candidateStatus = process.env.APPROVE_ACTIVE;
  }
  else if(approveStatus =='pending'){
    candidateStatus = process.env.APPROVE_DEFAULT;
  }
  else{
    candidateStatus = process.env.REJECT_STATUS;
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
  db.query('SELECT candidate FROM CANDIDATES WHERE  office=$1 AND candidate = $2', [office, candidate])
    .then((candidatesData) => {
      if (!candidatesData.rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'The candidate with given id has not express interest for this office',
        });
      }
      
         db.query('UPDATE candidates SET approve_status=$1 WHERE candidate=$2 RETURNING *', [candidateStatus, candidate])
                    .then((userValue) => {
                      const data = userValue.rows[0];
                      return res.status(200).send({
                        status: 200,
                        data,
                        message: `Candidate expression for this office is ${approveStatus}`,
                      });
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        status: 500,
                        error: 'unable to set approval status for candidate',
                        err: err.message,
                      });
                    })
                  })
                })
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
 * @function viewInterestedCandidate running for an office
 * @memberof CandidateController
 * @static
 */
  static viewInterestedCandidate(req, res) {
    const { id } = req.params;
    const approveStatus = process.env.APPROVE_DEFAULT;
    const office = Number(id);
    if (!(/^[\d]+$/.test(office))) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct office parameter',
      });
      return;
    }
    db.query('SELECT * FROM office WHERE id=$1', [office])
      .then((officeData) => {
        if (!officeData.rows[0]) {
          return res.status(404).send({
            status: 404,
            error: 'The office does not exist',
          });
        }
        let officeName = officeData.rows[0].officename;
        db.query('SELECT candidate,USERS.FIRSTNAME, USERS.LASTNAME, USERS.EMAIL,party.partyname, candidates.created_at FROM CANDIDATES INNER JOIN USERS ON CANDIDATE=USERS.ID inner join party on party=party.id WHERE office=$1 AND approve_status=$2', [office,approveStatus])
          .then((candidatesData) => {
            if (!candidatesData.rows[0]) {
              return res.status(404).send({
                status: 404,
                error: 'Candidate has not express interest for this office',
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
  /**
 * @function viewApprovedCandidate running for an office
 * @memberof CandidateController
 * @static
 */
static viewApprovedCandidate(req, res) {
  const { id } = req.params;
  const office = Number(id);
  const approveStatus = process.env.APPROVE_ACTIVE;
  if (!(/^[\d]+$/.test(office))) {
    res.status(400).send({
      status: 400,
      error: 'Enter the correct office parameter',
    });
    return;
  }
  db.query('SELECT * FROM office WHERE id=$1', [office])
    .then((officeData) => {
      if (!officeData.rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'The office does not exist',
        });
      }
      let officeName = officeData.rows[0].officename;
      db.query('SELECT candidate,USERS.FIRSTNAME, USERS.LASTNAME, USERS.EMAIL,party.partyname, candidates.created_at FROM CANDIDATES INNER JOIN USERS ON CANDIDATE=USERS.ID inner join party on party=party.id WHERE office=$1 AND approve_status=$2', [office,approveStatus])
        .then((candidatesData) => {
          if (!candidatesData.rows[0]) {
            return res.status(400).send({
              status: 400,
              error: 'Candidate has not been approved for this office',
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
