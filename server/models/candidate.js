/** Class for interacting with the candidate data table. */
export default class Candidate {
  /**
  * Class constructor.
  * @param {object} db - Object used to query database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * Create a new user.
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO candidates (office,candidate,party) VAlUES( ${office}, ${candidate}, ${party}) RETURNING (SELECT officeName FROM office WHERE id=${office}) AS officeName, (SELECT lastName,firstName, otherName FROM users WHERE id=${candidate}) AS Candidate, (SELECT partyName FROM party WHERE id=${party}) AS partyName';
    return this.db.many(sql, values);
  }

  /**
  * Method for finding a candidate using the id.
  * @param {number} id - the id of a candidate.
  */

  findById(id) {
    const sql = 'SELECT * FROM candidates WHERE candidate = $1';
    return this.db.oneOrNone(sql, id);
  }
  /**
* Method for finding a user using the status.
* @param {number} status - the status of a user.
*/

  findByStatus(status) {
    const sql = 'SELECT id, firstname, lastname, othername, email, phoneNumber, passportUrl,isAdmin created_at FROM users WHERE user_status = $1';
    return this.db.many(sql, status);
  }
  /**
  * Method for finding a user using the email address.
  * @param {String} email - the email of a user.
  */

  findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    return this.db.oneOrNone(sql, email);
  }
  /**
  * Method for finding a user using the telephone number.
  * @param {String} telephone - the telephone number of a user.
  */

  findByPhoneNumber(telephone) {
    const sql = 'SELECT * FROM users WHERE phoneNumber = $1';
    return this.db.oneOrNone(sql, telephone);
  }
  /**
  * Method for removing a user from the database using the id.
  * @param {number} id - the id of a user.
  */

  remove(id) {
    const sql = 'DELETE FROM users WHERE id = $1';
    return this.db.one(sql, id);
  }
  /** Method for getting all users in the database. */

  allData() {
    const sql = 'SELECT * FROM users';
    return this.db.many(sql);
  }
  /**
  * Method for modifying user information.
  * @param {number} id - the id of a user.
  */

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE users SET firstname=${firstname}, lastname=${lastname}, othername=${othername}, email=${email}, phoneNumber=${phonenumber} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for modifying user status.
  * @param {number} id - the id of a subject course.
  */

  modifyStatus(values, id) {
    values.id = id;
    const sql = 'UPDATE users SET isAdmin=${isAdmin} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
}
