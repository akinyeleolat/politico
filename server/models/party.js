/** Class for interacting with the party data table. */
export default class Party {
  /**
  * Class constructor.
  * @param {object} db - Object used to query database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * Create a new party.
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO party (partyName, partyDetail, hqAddress, logoUrl) VAlUES($1,$2,$3,$4) RETURNING *';
    return this.db.query(sql, values);
    // return this.db.one(sql, values);
  }

  /**
  * Method for finding a aprty using the id.
  * @param {number} id - the id of a party.
  */

  findById(id) {
    const sql = 'SELECT * FROM party WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }

  /**
  * Method for finding a user using the email address.
  * @param {String} partyName - the email of a user.
  */

  findByName(partyName) {
    const sql = 'SELECT * FROM party WHERE partyName = $1';
    return this.db.oneOrNone(sql, partyName);
  }
  /**
  * Method for finding a user using the email address.
  * @param {String} partyName - the email of a user.
  */

  findByDetail(partyDetail) {
    const sql = 'SELECT * FROM party WHERE partyDetail = $1';
    return this.db.oneOrNone(sql, partyDetail);
  }
  /**
  * Method for removing a party from the database using the id.
  * @param {number} id - the id of a party.
  */

  remove(id) {
    const sql = 'DELETE FROM party WHERE id = $1 RETURNING *';
    return this.db.one(sql, id);
  }
  /** Method for getting all party in the database. */

  allData() {
    const sql = 'SELECT * FROM party';
    return this.db.many(sql);
  }
  /**
  * Method for modifying party information.
  * @param {number} id - the id of a party.
  */

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE party SET partyName=${partyName}, partyDetail=${partyDetail}, hqAddress=${hqAddress}, logoUrl=${logoUrl} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for modifying party name.
  * @param {number} id - the id of a party.
  */

  modifyName(values, id) {
    values.id = id;
    const sql = 'UPDATE party SET partyName = ${partyName}, partyDetail=${partyDetail} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
}
