import db from '../db';

/** user controller class */
class CandidateController {
/**
 * @function enrollCandidate
 * @memberof CandidateController
 * @static
 */
  static enrollCandidate(req, res) {
    let { id } = req.params;
    id = Number(id);
    if (isNaN(id)) {
      res.status(400).send({
        status: 400,
        error: 'Enter the correct user parameter',
      });
      return;
    }
    const candidate = Number(id);
    let { office, party } = req.body;
    office = office ? office.toString().trim() : office;
    party = party ? party.toString().trim() : party;
    party = Number(party);
    office = Number(office);

    db.query('SELECT * FROM CANDIDATES WHERE ID=$1',[id])
      .then((candidates) => {
        if (candidates.rows[0]) {
          res.status(409).send({
            status: 409,
            error: 'The candidate with given id has been enroll for an office',
          });
          return;
        }
        db.query('INSERT INTO CANDIDATES VALUES $1,$2,$3 RETURNING *',[office, candidate, party])
          .then((userdata) => {
            const data = userdata.rows[0];
            return res.status(200).send({
              status: 201,
              data,
              message: `Candidate enroll for  ${office}`,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: 500,
              error: 'unable to enroll candidate',
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
