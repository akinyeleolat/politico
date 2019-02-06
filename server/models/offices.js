/** Class for interacting with the office data table. */
export default class Office {
  /**
  * Class constructor.
  * @param {object} db - Object used to query database.
  */
  constructor(db) {
    this.db = db;
  }
  /**
  * Create a new office.
  * @param {object} values - values gotten from the body of a request.
  */

  create(values) {
    const sql = 'INSERT INTO office (officeName, officeType) VAlUES(${officeName},${officeType}) RETURNING *';
    return this.db.one(sql, values);
  }

  /**
  * Method for finding a office using the id.
  * @param {number} id - the id of a office.
  */

  findById(id) {
    const sql = 'SELECT * FROM office WHERE id = $1';
    return this.db.oneOrNone(sql, id);
  }

  /**
  * Method for finding a user using the email address.
  * @param {String} officeName - the email of a user.
  */

  findByName(officeName) {
    const sql = 'SELECT * FROM office WHERE officeName = $1';
    return this.db.oneOrNone(sql, officeName);
  }
  /**
  * Method for finding a user using the email address.
  * @param {String} officeName - the email of a user.
  */

  findByType(officeType) {
    const sql = 'SELECT * FROM office WHERE officeType = $1';
    return this.db.oneOrNone(sql, officeType);
  }
  /**
  * Method for removing a office from the database using the id.
  * @param {number} id - the id of a office.
  */

  remove(id) {
    const sql = 'DELETE FROM office WHERE id = $1 RETURNING *';
    return this.db.one(sql, id);
  }
  /** Method for getting all office in the database. */

  allData() {
    const sql = 'SELECT * FROM office';
    return this.db.many(sql);
  }
  /**
  * Method for modifying office information.
  * @param {number} id - the id of a office.
  */

  modify(values, id) {
    values.id = id;
    const sql = 'UPDATE office SET officeName=${officeName}, officeType=${officeType} WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
  /**
  * Method for modifying office name.
  * @param {number} id - the id of a office.
  */

  modifyName(values, id) {
    values.id = id;
    const sql = 'UPDATE office SET officeName = ${officeName}, WHERE id=${id} RETURNING *';
    return this.db.one(sql, values);
  }
}
